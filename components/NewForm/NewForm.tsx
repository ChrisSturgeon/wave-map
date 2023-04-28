import { useState } from 'react';

export default function NewForm() {
  const [name, setName] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    const returnData = await response.json();
    console.log(returnData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Location Name</label>
      <input onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
