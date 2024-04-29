import React, { useEffect } from "react";
import Quagga from "quagga";

const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 2100 },
            height: { ideal: 2000 },
          },
        });

        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: document.querySelector("#barcode-scanner"),
              constraints: {
                ...stream.getTracks()[0].getSettings(),
              },
            },
            decoder: {
              readers: ["ean_reader","code_128_reader","code_93_reader","codabar_reader","code_39_vin_reader","code_39_reader","ean_8_reader","upc_reader","upc_e_reader","i2of5_reader","2of5_reader"],
            },
            locator: {
              locate: true,
              patchSize: "medium",
              halfSample: true,
            },
            frequency: 10,
          },
          (err) => {
            if (err) {
              console.error("Error initializing Quagga:", err);
              return;
            }

            Quagga.start();

            // Cleanup Quagga when component unmounts
            return () => {
              Quagga.stop();
              stream.getTracks().forEach((track) => track.stop());
            };
          }
        );

        Quagga.onDetected((data) => {
          // alert("Barcode Detected:", data.codeResult.code);
          onDetected(data.codeResult.code);
          Quagga.stop(); // Stop the scanner after detecting a barcode (optional)
        });
      } catch (error) {
        // alert(error)
        console.error("Error accessing camera:", error);
      }
    };

    initCamera();
  }, [onDetected]);

  return <div id="barcode-scanner" className="viewport" style={{ width: '390px', height: '180px' }} />;
};

export default Scanner;
