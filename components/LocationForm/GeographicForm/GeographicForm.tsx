type GeographicData = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type GeographicFormProps = GeographicData & {
  updateFields: (fields: Partial<GeographicData>) => void;
};

export default function GeographicForm({
  name,
  country,
  latitude,
  longitude,
  updateFields,
}: GeographicFormProps) {
  return (
    <>
      <label htmlFor="location-name">Name</label>
      <input
        required
        minLength={3}
        type="text"
        id="country-name"
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />
      <label htmlFor="country">Country</label>
      <input
        required
        minLength={3}
        type="text"
        id="country"
        value={country}
        onChange={(e) => updateFields({ country: e.target.value })}
      />
      <label htmlFor="latitude">Latitude</label>
      <input
        required
        type="number"
        id="latitude"
        value={latitude}
        onChange={(e) => updateFields({ latitude: Number(e.target.value) })}
      />
      <label htmlFor="latitude">Longitude</label>
      <input
        required
        type="number"
        id="longitude"
        value={longitude}
        onChange={(e) => updateFields({ longitude: Number(e.target.value) })}
      />
    </>
  );
}
