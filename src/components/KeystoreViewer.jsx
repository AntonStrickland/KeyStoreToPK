import { useRef, useState } from 'react';
import { ethers } from 'ethers';

const KeystoreViewer = () => {
  const fileInput = useRef(null);
  const [keystore, setKeystore] = useState(null);
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  const clearResult = () => {
    setPrivateKey('');
    setAddress('');
    setError('');
    setCopyStatus('');
  };

  const handleFileUpload = async (e) => {
    clearResult();
    setKeystore(null);

    const file = e.target.files[0];
    if (!file) return; // dialog was cancelled

    let text;
    try {
      text = await file.text();
    } catch {
      setError("Couldn't read that file.");
      return;
    }

    try {
      JSON.parse(text);
    } catch {
      setError("That file isn't valid JSON, so it can't be a keystore file.");
      return;
    }

    if (!ethers.isKeystoreJson(text) && !ethers.isCrowdsaleJson(text)) {
      setError('That JSON file is not a recognized Ethereum keystore format.');
      return;
    }

    setKeystore(text);
  };

  const decryptKeystore = async () => {
    clearResult();
    setProgress(0);
    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password, (p) => {
        // scrypt reports progress very often; only re-render on whole-percent changes
        const percent = Math.floor(p * 100);
        setProgress((prev) => (prev === percent ? prev : percent));
      });
      setPrivateKey(wallet.privateKey);
      setAddress(wallet.address);
    } catch (e) {
      if (e.shortMessage === 'incorrect password') {
        setError('Incorrect password.');
      } else {
        setError(`Couldn't decrypt this keystore: ${e.shortMessage || e.message}`);
      }
    } finally {
      setProgress(null);
    }
  };

  const copyPrivateKey = async () => {
    try {
      await navigator.clipboard.writeText(privateKey);
      setCopyStatus('Copied!');
    } catch {
      setCopyStatus('Copy failed');
    }
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const clearAll = () => {
    clearResult();
    setKeystore(null);
    setPassword('');
    if (fileInput.current) fileInput.current.value = '';
  };

  const decrypting = progress !== null;

  return (
    <div className="w-full max-w-xl bg-gray-100 dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">🔐 Wallet Keystore Decryptor</h1>

      <div>
        <label className="block mb-2 text-sm font-medium">Keystore File</label>
        <input
          ref={fileInput}
          type="file"
          onChange={handleFileUpload}
          disabled={decrypting}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                     dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Wallet Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>

      <button
        onClick={decryptKeystore}
        disabled={!keystore || !password || decrypting}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg
                   hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {decrypting ? `Decrypting… ${progress}%` : 'Decrypt to Private Key'}
      </button>

      {decrypting && (
        <progress
          value={progress}
          max="100"
          className="w-full h-2 rounded-lg overflow-hidden accent-blue-600"
        />
      )}

      {privateKey && (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg space-y-3">
          <div>
            <div className="text-sm font-medium">Wallet address</div>
            <div className="font-mono text-sm break-all">{address}</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="italic text-sm">Private key is hidden for your security</span>
            <div className="flex gap-2 ml-4">
              <button
                onClick={copyPrivateKey}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              >
                {copyStatus || 'Copy'}
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>
          <p className="text-xs">
            Copied keys stay on your clipboard, and Windows clipboard history (Win+V) or clipboard
            sync may keep them longer. Clear your clipboard once you've pasted the key where it's needed.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="text-center italic">
        <a href="https://github.com/AntonStrickland/KeyStoreToPK">View full source code on GitHub</a>
      </div>
    </div>
  );
};

export default KeystoreViewer;
