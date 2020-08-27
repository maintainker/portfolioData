        let AESencryptionData = "";
        let nshcPlainData = "";
        let nshcEncData;
        let nshcAESEncData;
        let nshcDecData = "";
        let RSAkey;
        let RSAPubkey;
        let AESkey=''; 
        let importAESkey=''; 
        let numIV = window.crypto.getRandomValues(new Uint8Array(16));
        let IV ='';
        let tmpIV=""
        let finalPlain = "";
        for(i in numIV){
            tmpIV += String.fromCharCode(numIV[i]);
        }
        IV = btoa(tmpIV);

        window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1,0,1]),
            hash: "SHA-256"
        },
        true,["encrypt","decrypt"]).then((v)=>{// 키 내보내기 예제
            RSAkey = v;
         return window.crypto.subtle.exportKey( "spki",  v.publicKey)
        }).then((v)=>{
            const keyArr = new Uint8Array(v)
            let keyStr = "";
            for(i in keyArr){
                keyStr += String.fromCharCode(keyArr[i]);
            }
            RSAPubkey = btoa(keyStr);
            textBox.innerHTML = "RSA PubKey : " + RSAPubkey + "</br></br>";
        })
        const AESencrypt = (plainData) =>{
            const enc = (new TextEncoder()).encode(plainData);
            window.crypto.subtle.encrypt(
                {
                    name: "AES-CBC",
                    iv:numIV
                },AESkey,enc
            ).then((v)=>{
                const Arr = new Uint8Array(v);
                let strEnc = "";
                for(i in Arr){
                    strEnc += String.fromCharCode(Arr[i]);
                }
                nshcAESEncData = btoa(strEnc);
            })
        }


        const AESdecrypt = (iv,aesKey,encData)=>{
            
            const encStr = atob(encData);
            let dec8Arr = new Uint8Array(encStr.length);
            for(i in dec8Arr){
                dec8Arr[i] = encStr.charCodeAt(i);
            }//encData uint8Arr로 변형

            const strIV = atob(iv);
            let IV = new Uint8Array(strIV.length);
            for(i in IV){
                IV[i] = strIV.charCodeAt(i)
            }// IV 완성

            let tmp = window.atob(aesKey);
            const buf = new ArrayBuffer(tmp.length);
            const bufView = new Uint8Array(buf);
            for(i in tmp){
                bufView[i] = tmp.charCodeAt(i)
            }//aes import위해

            window.crypto.subtle.importKey("raw",buf,"AES-CBC",true,["encrypt","decrypt"]).then((v)=>{// 키 import 완료
            return window.crypto.subtle.decrypt({
                name:"AES-CBC",
                iv : IV
                },v,dec8Arr)
            }).then((v)=>{
                const decArr = new Uint8Array(v);
                let str = "";
                for(i in decArr){
                   str += String.fromCharCode(decArr[i]);
                }
                return str;
            }).then((v)=>{
                finalPlain = v;
            })
        }

        const RSAencrypt = (plainData) =>{ // rsa 암호화
            const enc = (new TextEncoder()).encode(plainData);

            let tmp = window.atob(RSAPubkey);
            const buf = new ArrayBuffer(tmp.length);
            const bufView = new Uint8Array(buf);
            for(i in tmp){
                bufView[i] = tmp.charCodeAt(i)
            }
            const result = window.crypto.subtle.importKey(
                "spki",
                buf,
                {
                    name:"RSA-OAEP",
                    hash:"SHA-256"
                },
                true,
                ["encrypt"]
            ).then((v)=>{
                return  window.crypto.subtle.encrypt({
                    name:"RSA-OAEP"
                },v,enc);
            }).then((v)=>{
                const encData = new Uint8Array(v);
                let encString = "";
                for(val of encData){
                    encString += String.fromCharCode(val);
                }
                nshcEncData = btoa(encString);
            });

        }



        const RSAdecrypt = (encData) =>{ // rsa 복호화
            const decString = atob(encData);
            let dec8Arr = new Uint8Array(decString.length);
            for(i in dec8Arr){
                dec8Arr[i] = decString.charCodeAt(i);
            }
            window.crypto.subtle.decrypt({
                    name:"RSA-OAEP"
            },RSAkey.privateKey,dec8Arr).then((v)=>{
                return new Uint8Array(v);
            }).then((v)=>{
                for(i in v){
                    nshcDecData += String.fromCharCode(v[i]);
                }
                return nshcDecData
            });
        }




       window.crypto.subtle.generateKey( // aes 키생성
            {
                name: "AES-CBC",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        ).then((v)=>{
            AESkey = v;
            return window.crypto.subtle.exportKey(
                "raw",
                AESkey
            );
        }).then((v)=>{
            const Numkey = new Uint8Array(v);
            let strKey = "";
            for(i in Numkey){
                strKey += String.fromCharCode(Numkey[i]);
            }
            importAESkey = btoa(strKey);
        });









