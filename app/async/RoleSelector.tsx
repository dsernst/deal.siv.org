'use client'

export const roles = [
  ['Buyer', 'Max Offer'],
  ['Seller', 'Min Price'],
] as const
export type Choices = 'buyer' | 'seller'

export function RoleSelector({
  onSelect,
  selectedRole = null,
}: {
  onSelect: (role: Choices) => void
  selectedRole?: Choices | null
}) {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h2 className="text-xl font-medium text-white/90">Are you the...</h2>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        {roles.map(([role, description]) => {
          const choice = role.toLowerCase() as Choices
          const selected = selectedRole === choice
          return (
            <button
              className={`cursor-pointer rounded-2xl border px-6 py-5 text-left transition-colors ${
                selected
                  ? 'border-cyan-400/25 bg-cyan-400/8'
                  : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
              }`}
              key={role}
              onClick={() => onSelect(choice)}
              type="button"
            >
              <span className="block text-[17px] font-medium text-white">Potential {role}</span>
              <span className="mt-1 block text-sm text-white/40">{description}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
