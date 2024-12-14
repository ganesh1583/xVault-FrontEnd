import { useState } from "react"
import VaultCard from "./components/VaultCard"
import VaultModal from "./components/VaultModal"
import Navbar from "./components/Navbar"

const VAULTS = [
  {
    name: "WBTC Vault",
    apy: 12.89,
    tvl: 150,
    balance: 0
  },
  {
    name: "WETH Vault",
    apy: 10.89,
    tvl: 100,
    balance: 0
  },
  {
    name: "WBTC-WETH 50-50 Vault",
    apy: 7.89,
    tvl: 150,
    balance: 0
  }
]

export default function Page() {
  const [selectedVault, setSelectedVault] = useState(null)

  return (
    <div className="min-h-screen w-screen bg-black px-5">
      <Navbar />
      {/* Hero Section */}
      <section className="container px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex gap-8 lg:grid-cols-2 lg:gap-12 items-center justify-between">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-white max-w-[600px]">
              Simple, Smart, and Trusted Way to Invest in Crypto
            </h1>
            <p className="text-gray-400 max-w-[600px] text-lg font-bold">
              If you&apos;re interested in investing in XION but have been put off by the complexity of purchasing and storing digital assets yourself, we&apos;ve made it simple for you.
            </p>
          </div>
          <div className="relative h-[300px] lg:h-[400px]">
            <img
              src="https://mantra-chain-vaultify.vercel.app/assets/Vaults-BMmui_Az.png"
              alt="Crypto Vault"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Highest APY Section */}
      <section className="container px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-white">Highest APY</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {VAULTS.map((vault) => (
            <VaultCard
              key={vault.name}
              name={vault.name}
              apy={vault.apy}
            />
          ))}
        </div>
      </section>

      {/* All Vaults Section */}
      <section className="container px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-white">All Vaults</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {VAULTS.map((vault) => (
              <VaultCard
                key={vault.name}
                name={vault.name}
                apy={vault.apy}
                tvl={vault.tvl}
                onClick={() => setSelectedVault(vault)}
              />
            ))}
          </div>
          <div className="relative hidden lg:block">
            <img
              src="https://mantra-chain-vaultify.vercel.app/assets/RuppeeBag-CkO2SLzh.png"
              alt="Money Bag"
              width={500}
              height={500}
              className="object-contain mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Vault Modal */}
      {selectedVault && (
        <VaultModal
          isOpen={!!selectedVault}
          onClose={() => setSelectedVault(null)}
          vault={selectedVault}
        />
      )}
    </div>
  )
}

