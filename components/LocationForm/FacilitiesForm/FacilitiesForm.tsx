type FacilitiesData = {
  parking: string;
  toilets: string;
  cafe: string;
};

type FacilitiesFormProps = FacilitiesData & {
  updateFields: (fields: Partial<FacilitiesData>) => void;
};

export default function FacilitiesForm({
  parking,
  toilets,
  cafe,
  updateFields,
}: FacilitiesFormProps) {
  return (
    <>
      <label htmlFor="parking">Parking</label>
      <input
        autoFocus
        value={parking}
        onChange={(e) => updateFields({ parking: e.target.value })}
        type="text"
        id="parking"
      />
      <label htmlFor="toilets">Toilets</label>
      <input
        value={toilets}
        onChange={(e) => updateFields({ toilets: e.target.value })}
        type="text"
        id="toilets"
      />
      <label htmlFor="cafe">Cafe</label>
      <input
        value={cafe}
        onChange={(e) => updateFields({ cafe: e.target.value })}
        type="text"
        id="cafe"
      />
    </>
  );
}
