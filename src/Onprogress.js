// Onprogress.js
import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, Select, Label, TextInput, Spinner, Textarea } from 'flowbite-react';

function Onprogress() {
    const videoRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showVideo, setShowVideo] = useState(false);

  const startCamera = async () => {
    setShowVideo(true);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing the camera:', error);
        setShowVideo(false);
      }
  };

  function getData() {
    alert();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false); // Setelah mendapatkan lokasi, atur loading ke false
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  const descriptionStyle = {
    backgroundColor: '#ff9104',
    // fontWeight: 'bold',
    fontSize: '10px',
  };

  return (
    <div>
        <div className="bg-white shadow-md rounded-lg p-2 mb-4" style={descriptionStyle} >
            <h2 className="text-xl font-semibold mb-2">ONPROGRESS</h2>
            <p className="text-gray-600">
                User Login : Yusup Pirdaus
                {loading ? (
                    <div className="spinner">
                        <Spinner
                            aria-label="Extra small spinner example"
                            size="xs"
                        />
                        Sedang Memuat lokasi...
                    </div>
                ) : (
                    <div>
                        <h1>Latitude: {latitude} || Longitude: {longitude}</h1>
                    </div>
                )}
            </p>
        </div>
    <div>
    <Card>
        <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="noawb" value="No. AWB" />
                </div>
                <TextInput
                    id="noawb"
                    placeholder="Masukan No AWB"
                    required
                    type="text"
                />
            </div>
            <Button onClick={getData}>Retrieve Data</Button>
            {showVideo && (
                <div>
                    <video ref={videoRef} autoPlay playsInline />
                </div>
            )}
            <Button onClick={startCamera}>Scan Barcode</Button>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="consignee" value="Consignee" />
                </div>
                <TextInput
                    id="consignee"
                    placeholder="Masukan consignee"
                    type="text"
                />
                <div className="mb-2 block">
                    <Label htmlFor="kotatujuan" value="Kota Tujuan" />
                </div>
                <TextInput
                    id="kotatujuan"
                    placeholder="Masukan Kota Tujuan"
                    type="text"
                />
                <div className="max-w-md" id="select" >
                    <div className="mb-2 block">
                        <Label htmlFor="countries" value="Jenis Shipment"/>
                    </div>
                    <Select id="countries" required >
                        <option> United States </option>
                        <option> Canada </option>
                        <option> France </option>
                        <option> Germany </option>
                    </Select>
                </div>
                <div className="mb-2 block">
                    <Label htmlFor="keterangan" value="Keterangan" />
                </div>
                <Textarea
                    id="Keterangan"
                    placeholder="Keterangan"
                    required
                    rows={4}
                />
            </div>
        </form>
    </Card>
  </div>
</div>

  );
}


export default Onprogress;
