import { useState } from 'react';
import { ethers } from 'ethers';

const KeystoreViewer = () => {

	const [keystore, setKeystore] = useState(null);
	const [password, setPassword] = useState('');
	const [privateKey, setPrivateKey] = useState('');
	const [error, setError] = useState('');
  
	const handleFileUpload = (e) => {
	  const reader = new FileReader();
	  reader.onload = (event) => {
		setKeystore(event.target.result);
	  };
	  reader.readAsText(e.target.files[0]);
	};
  
	const decryptKeystore = async () => {
	  try {
		setError('');
		setPrivateKey('');
		const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
		setPrivateKey(wallet.privateKey);
	  } catch (e) {
		setError('Failed to decrypt. Check your password and file.');
	  }
	};
  
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-6 text-gray-900 dark:text-gray-100">
		  <div className="w-full max-w-xl bg-gray-100 dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
			<h1 className="text-2xl font-bold text-center">🔐 Wallet Keystore Decryptor</h1>
	  
			<div>
			  <label className="block mb-2 text-sm font-medium">Keystore File</label>
			  <input
				type="file"
				accept=".json"
				onChange={handleFileUpload}
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
			  disabled={!keystore || !password}
			  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg
						 hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
			>
			  Decrypt to Private Key
			</button>
	  
			{privateKey && (
				<div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg flex items-center justify-between">
				<span className="italic text-sm">Private key is hidden for your security</span>
				<button
					onClick={() => navigator.clipboard.writeText(privateKey)}
					className="ml-4 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
				>
					Copy
				</button>
				</div>
			)}
	  
			{error && (
			  <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200">
				{error}
			  </div>
			)}

			<div className="text-center italic">
				<a href="https://github.com/AntonStrickland">View full source code on GitHub</a>
			</div>
		  </div>
		</div>
	  );
	  

}

export default KeystoreViewer;