/* eslint-disable @typescript-eslint/no-explicit-any */


interface PartnerListProps {
 
  partners: any[];
  activePartner: any;
  onSelect: (p: any) => void;
}

export default function PartnerList({
  partners,
  activePartner,
  onSelect,
}: PartnerListProps) {
  return (
    <div className="w-1/4 bg-white border-r overflow-y-auto">
      <h2 className="p-4 text-xl font-bold border-b">Partnerek</h2>

      {partners.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
            activePartner?.id === p.id ? "bg-gray-100" : ""
          }`}
        >
          <img
            src={p.avatar || `https://ui-avatars.com/api/?name=${p.name}`}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg">{p.name}</span>
        </div>
      ))}
    </div>
  );
}