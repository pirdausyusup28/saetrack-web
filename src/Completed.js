// Completed.js
import axios from 'axios';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Scanner from "./Scanner";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import Webcam from 'react-webcam';
import { Button, Card, Select, Label, TextInput, Spinner, Textarea } from 'flowbite-react';
import BottomNav from './BottomNav';
import 'react-html5-camera-photo/build/css/index.css';
// import "./styles.css";

function Completed() {
    const videoRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noawb, setNoawb] = useState(null);
    const [namacon, setNamacon] = useState(null);
    const [dstid, setDstid] = useState(null);
    const [Iddst, setIddst] = useState(null);
    // const [selectedValue, setSelectedValue] = useState('');
    const [diterimaoleh, setDiterimaoleh] = useState('');
    // const [keterangan, setKeterangan] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [userData, setUserData] = useState(null);
    // const [data, setData] = useState([]);
    // const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraIsActive, setCameraIsActive] = useState(false);
    // const webcamRef2 = useRef(null);
    const [capturedImage2, setCapturedImage2] = useState(null);
    const [cameraIsActive2, setCameraIsActive2] = useState(false);

    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState(null);

    const onDetected = result => {
      setResult(result);
      setNoawb(result);
    };

    const handleTakePhoto = (dataUri) => {
      // Mengambil gambar dari kamera
      setCapturedImage(dataUri);
      setCameraIsActive(false); // Matikan kamera setelah mengambil foto
    };

    const handleTakePhoto2 = (dataUri2) => {
      // Mengambil gambar dari kamera
      setCapturedImage2(dataUri2);
      setCameraIsActive2(false); // Matikan kamera setelah mengambil foto
    };

    const toggleCamera = () => {
      setCameraIsActive(!cameraIsActive);
      setShowVideo(true); // Set showVideo to true when the camera is active
    };    

    const toggleCamera2 = () => {
        setCameraIsActive2(!cameraIsActive2); // Mengubah status kamera
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

      if(response.data.data.flagtrm !== ''){
        alert('Shipment sudah diterima oleh ' + response.data.data.trmby);
        setNoawb('');
        setIddst('');
        setDstid('');
        setNamacon('');
        setDiterimaoleh('');
      }else{
        setIddst(data.data.data.dst_id);
        setDstid(data.data.data.nm_city);
        setNamacon(data.data.data.namacon);
        setDiterimaoleh('');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
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
    console.log(latitude);
    console.log(longitude);
    try {
      const response = await axios.post('https://tribatama.iconicbase.com/restapi/simpandata2_web.php', {
        no_awb: noawb,
        id_kota_tujuan: Iddst,
        keterangan: diterimaoleh,
        inputby: userData,
        latitude: latitude,
        longitude: longitude,
        gambar: capturedImage,
        gambar2: capturedImage2,
      }, {
        headers: {
          'Content-Type': 'image/jpeg', // Sesuaikan dengan tipe gambar yang dikirim
        },
      });
      console.log(response.status);
      if(response.status === 200){
        alert('Data Berhasil Disimpan');
        setNoawb('');
        setIddst('');
        setDstid('');
        setNamacon('');
        setCapturedImage('');
        setCapturedImage2('');
        setDiterimaoleh('');
      }else{
        setNoawb('');
        setIddst('');
        setDstid('');
        setNamacon('');
        setCapturedImage('');
        setCapturedImage2('');
        setDiterimaoleh('');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
    // getShipment();
    getLocation();
    console.log(capturedImage);
  }, []);

  const descriptionStyle = {
    backgroundColor: '#06b6d4',
    fontSize: '10px',
  };

  const isButtonDisabled =
    noawb === '' ||
    Iddst === '' ||
    diterimaoleh === '';

  const isButtonDisabled2 =
    noawb === '' ||
    Iddst === '' ||
    diterimaoleh === '' ||
    capturedImage === null;

  return (
    <div>
        <div className="p-2 mb-4 bg-white rounded-lg shadow-md" style={descriptionStyle} >
            <h2 className="mb-2 text-xl font-semibold">Completed</h2>
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
            <div className='App'>
              {camera && (
                <div className="container">
                  {camera && <Scanner onDetected={onDetected} style={{ width: '10px',height:'10px'}} />}
                </div>
              )}
            </div>
            <Button onClick={() => setCamera(!camera)}>{camera ? "Stop Scan Barcode" : "Mulai Scan Barcode"}</Button>
            <div>
                <div className="block mb-2">
                    <Label htmlFor="consignee" value="Consignee" />
                </div>
                <TextInput
                    id="consignee"
                    value={namacon}
                    placeholder="Masukan consignee"
                    onChange={namacon => setNamacon(namacon)}
                    type="text"
                    readOnly
                />
                <div className="block mb-2">
                    <Label htmlFor="kotatujuan" value="Kota Tujuan" />
                </div>
                <TextInput
                    id="kotatujuan"
                    value={dstid}
                    onChange={dstid => setDstid(dstid)}
                    placeholder="Masukan Kota Tujuan"
                    type="text"
                    readOnly
                />
                <div className="block mb-2">
                    <Label htmlFor="diterimaoleh" value="Di Terima Oleh" />
                </div>
                <TextInput
                    id="diterimaoleh"
                    value={diterimaoleh}
                    onChange={(e) => setDiterimaoleh(e.target.value)}
                    placeholder="Masukan Diterima Oleh"
                    type="text"
                />
            </div>
            <div>
            {cameraIsActive && showVideo ? (
                <Camera
                  idealFacingMode={FACING_MODES.ENVIRONMENT}
                  imageType={IMAGE_TYPES.JPG}
                  onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
                />
              ) : (
                <img src={capturedImage} alt="" />
              )}

            </div>
              <Button onClick={toggleCamera} disabled={isButtonDisabled}>{capturedImage ? 'Ubah Photo 1' : 'Photo 1'}</Button>
            <div>
                {cameraIsActive2 ? (
                  <Camera
                    idealFacingMode={FACING_MODES.ENVIRONMENT} // Menggunakan kamera depan
                    imageType = {IMAGE_TYPES.JPG}
                    onTakePhoto={(dataUri2) => handleTakePhoto2(dataUri2)}
                  />
                ) : (
                  <img src={capturedImage2} alt="" />
                )}
            </div>
            <Button onClick={toggleCamera2} disabled={isButtonDisabled2}>{capturedImage2 ? 'Ubah Photo 2' : 'Photo 2'}</Button>
            <Button onClick={simpanData} disabled={isButtonDisabled2}>Simpan Data</Button>
        </form>
    </Card>
  </div><br></br><br></br><br></br><br></br><br></br>
  <BottomNav />
</div>

  );
}


export default Completed;
