import { useState } from "react";
import { Abstraxion, useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";

const Navbar = () => {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const [, setShow] = useModal();

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 lg:px-10 py-4">
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://mantra-chain-vaultify.vercel.app/assets/brainwave-symbol-BpglIlwE.svg"
            width={40}
            height={40}
            alt="Vaultify Logo"
          />
          <span className="text-2xl font-semibold text-white">XVAULT</span>
        </a>

        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Home</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Vaults</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">About</a>
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Contact</a>
        </nav>

        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          {bech32Address ? "VIEW ACCOUNT" : "CONNECT"}
        </button>
        <Abstraxion onClose={() => setShow(false)} />
      </div>
    </div>
  );
};

export default Navbar;

