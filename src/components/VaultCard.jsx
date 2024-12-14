export default function VaultCard({ name, apy, tvl, onClick }) {
    return (
      <div 
        className="p-6 bg-gray-900 border border-gray-800 hover:border-purple-500 transition-colors cursor-pointer rounded-lg"
        onClick={onClick}
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white">{apy}%</p>
              <p className="text-sm text-gray-400">APY</p>
            </div>
            {tvl && (
              <div className="space-y-1 text-right">
                <p className="text-lg font-semibold text-white">{tvl}k</p>
                <p className="text-sm text-gray-400">TVL</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  