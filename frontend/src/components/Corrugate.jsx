export default function Corrugate({ fg = '#1b2023', bg = 'none' }) {
  return (
    <svg
      className="corrugate"
      viewBox="0 0 240 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bg !== 'none' && <rect width="240" height="20" fill={bg} />}
      <path
        d="M0 20 V10 Q6 0 12 10 T24 10 T36 10 T48 10 T60 10 T72 10 T84 10 T96 10 T108 10 T120 10 T132 10 T144 10 T156 10 T168 10 T180 10 T192 10 T204 10 T216 10 T228 10 T240 10 V20 Z"
        fill={fg}
      />
    </svg>
  );
}
