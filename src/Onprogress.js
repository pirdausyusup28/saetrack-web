// Onprogress.js
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import Scanner from "./Scanner";
import { Button, Card, Select, Label, TextInput, Spinner } from 'flowbite-react';
import BottomNav from './BottomNav';
import "./styles.css";

function Onprogress() {
    const videoRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noawb, setNoawb] = useState(null);
    const [namacon, setNamacon] = useState(null);
    const [dstid, setDstid] = useState(null);
    const [Iddst, setIddst] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [userData, setUserData] = useState(null);
    const [data, setData] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState(null);

    const onDetected = result => {
      setResult(result);
      setNoawb(result);
    };
  
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

  const getData = async () => {
    try {
      const response = await axios.post('https://tribatama.iconicbase.com/restapi/cekdata_web.php', {
        noawb: noawb
      });

      const data = response;
      console.log(noawb);
      console.log(data);

      if(response.data.data.flagtrm !== ''){
        alert('Shipment sudah diterima oleh ' + response.data.data.trmby);
        setNoawb('');
        setIddst();
        setDstid();
        setNamacon();
        setKeterangan();
      }else{
        setIddst(data.data.data.dst_id);
        setDstid(data.data.data.nm_city);
        setNamacon(data.data.data.namacon);
        setKeterangan('');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const getShipment = async () => {
    try {
      const response = await axios.get('https://tribatama.iconicbase.com/restapi/shipment_web.php');
      setData(response.data.data);
      console.log(response.data.data);
     
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(selectedValue);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const simpanData = async () => {
    setIsButtonDisabled(true); // Menonaktifkan tombol saat mengirim data
    try {
      const response = await axios.post('https://tribatama.iconicbase.com/restapi/simpandata_web.php', {
        noawb: noawb,
        jenis_shipment: selectedValue,
        keterangan: keterangan,
        id_kota_tujuan: Iddst,
        inputby: userData,
        latitude: latitude,
        longitude: longitude,
      });
      console.log(response.status);
      if(response.status === 200){
        alert('Data Berhasil Disimpan');
        setIsButtonDisabled(false);
        setIsDataSubmitted(true); // Mengatur status pengiriman data berhasil
        setNoawb('');
        setIddst('');
        setDstid('');
        setNamacon('');
        setSelectedValue('');
        setKeterangan('');
      }else{
        alert('Data Gagal Disimpan');
        setNoawb('');
        setIddst('');
        setDstid('');
        setNamacon('');
        setSelectedValue('');
        setKeterangan('');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsButtonDisabled(false); // Mengaktifkan tombol setelah pengiriman data selesai
    }
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
    getShipment();
    getLocation();
  }, []);

  const descriptionStyle = {
    backgroundColor: '#06b6d4',
    fontSize: '10px',
  };

  const isButtonDisabledx =
    noawb === '' ||
    selectedValue === '' ||
    keterangan === '' ||
    isButtonDisabled === 'false';

  return (
    <div>
        <div className="p-2 mb-4 bg-white rounded-lg shadow-md" style={descriptionStyle} >
            <h2 className="mb-2 text-xl font-semibold">ONPROGRESS</h2>
            <p className="text-gray-600">
                User Login : {userData}
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
                <div className="block mb-2">
                    <Label htmlFor="noawb" value="No. AWB" />
                </div>
                <TextInput
                    id="noawb"
                    value={noawb}
                    onChange={(e) => setNoawb(e.target.value)}
                    placeholder="Masukan No AWB"
                    required
                    type="text"
                />
            </div>
            <Button onClick={getData}>Retrieve Data</Button>
            <div className="App">
              {/* <p>{result ? result : ""}</p> */}
              {camera && (
                <div className="container">
                  {camera && <Scanner onDetected={onDetected} />}
                </div>
              )}
            </div>
            <Button onClick={() => setCamera(!camera)}>{camera ? "Stop Scan Barcode" : "Mulai Scan Barcode"}</Button>
            {showVideo && (
                <div>
                    <video ref={videoRef} autoPlay playsInline />
                </div>
            )}
            {/* <Button onClick={startCamera}>Scan Barcode</Button> */}
            <div>
                <div className="block mb-2">
                    <Label htmlFor="consignee" value="Consignee" />
                </div>
                <TextInput
                    id="consignee"
                    value={namacon}
                    placeholder="Masukan consignee"
                    onChangeText={namacon => setNamacon(namacon)}
                    type="text"
                    readOnly
                />
                <div className="block mb-2">
                    <Label htmlFor="kotatujuan" value="Kota Tujuan" />
                </div>
                <TextInput
                    id="kotatujuan"
                    value={dstid}
                    onChangeText={dstid => setDstid(dstid)}
                    placeholder="Masukan Kota Tujuan"
                    type="text"
                    readOnly
                />
                <div className="max-w-md" id="select">
                  <div className="block mb-2">
                    <Label htmlFor="countries" value="Jenis Shipment" />
                  </div>
                  <Select id="countries" required onChange={handleSelectChange} value={selectedValue}>
                    <option>Pilih Jenis Shipment</option>
                    {data.map((option) => (
                      <option key={option.kode} value={option.kode}>
                        {option.nama}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="block mb-2">
                    <Label htmlFor="keterangan" value="Keterangan" />
                </div>
                <TextInput
                    id="Keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Keterangan"
                    type='text'
                />
            </div>
            <div>
              <Button onClick={simpanData} disabled={isButtonDisabledx}>
                Simpan Data
              </Button>
            </div>
        </form>
    </Card><br></br><br></br><br></br><br></br>
  </div>
  <BottomNav />
</div>

  );
}


export default Onprogress;
