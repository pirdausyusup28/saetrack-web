// Onprogress.js
import React, { useRef } from 'react';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
function Onprogress() {
    const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div>
        <div className="bg-white shadow-md rounded-lg p-2 mb-4">
            <h2 className="text-xl font-semibold mb-2">ONPROGRESS</h2>
            <p className="text-gray-600">user login : Yusup Pirdaus</p>
        </div>
    <div>
    <Card>
        <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label
                    htmlFor="noawb"
                    value="No. AWB"
                    />
                </div>
                <TextInput
                    id="noawb"
                    placeholder="Masukan No AWB"
                    required
                    type="text"
                />
            </div>
            <Button type="submit">Retrieve Data</Button>
            <Button onClick={startCamera}>Buka Kamera</Button>
            <video ref={videoRef} autoPlay playsInline />
        </form>
    </Card>
  </div>
</div>

  );
}

export default Onprogress;
