export default function WaveAndSportsForm() {
  return (
    <>
      <label htmlFor="wave-type">Wave Type</label>
      <input type="text" id="wave-type" />
      <label htmlFor="wave-type">Suitable For Type</label>
      <input type="checkbox" id="surfing" name="surfing" />
      <label htmlFor="surfing">Surfing</label>
      <input type="checkbox" id="paddleboarding" name="paddleboarding" />
      <label htmlFor="paddleboarding">paddleboarding</label>
    </>
  );
}
