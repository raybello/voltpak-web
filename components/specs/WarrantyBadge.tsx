export default function WarrantyBadge({
  warranty,
}: {
  warranty: { unit: string; battery: string };
}) {
  return (
    <section className="bg-ink-100 py-10 border-y border-ink-100">
      <div className="max-w-container mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <Item icon={<TruckIcon />} label="Free US shipping" value="Orders over $100" />
        <Item icon={<ShieldIcon />} label="Warranty" value={warranty.unit} />
        <Item icon={<RotateIcon />} label="Returns" value="30-day, no questions" />
        <Item icon={<HeadphonesIcon />} label="Support" value="US-based, 7 days a week" />
      </div>
    </section>
  );
}

function Item({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-accent-hover">{icon}</div>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </div>
      <div className="text-sm text-ink-900">{value}</div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 16V6h11v10M14 10h4l3 3v3h-7M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Zm-3 8 2.5 2.5L15 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RotateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4v6h6M20 20v-6h-6M20 8A8 8 0 0 0 5.3 6M4 16a8 8 0 0 0 14.7 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function HeadphonesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 14v-2a8 8 0 1 1 16 0v2M4 14h3v6H4v-6Zm13 0h3v6h-3v-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
