import { vehiclesColRef } from "@/lib/firebase";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const vehiclesCols = `
    [{"vin":"8388HG67E572882","timestamp":1683180032,"cutout":"https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/Vehicles%2FCutouts%2F720s_new.png?alt=media&token=211c9a69-9db6-429f-8061-c126f0f93b94","trim":"Ryft","title":"McLaren 720S","t":"https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/Vehicles%2FThumbnail%2Fuser1%2FScreenshot%202023-04-28%20at%2010.23.43%20PM.png?alt=media&token=09ea706b-f764-4cdb-b33d-6e3ad9d348a2","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F08D03AF5-2CD0-454C-9447-FFCB524E840B%2FDF0B68B4-7AD5-4D46-A388-FEEAE179DFEF.jpg?alt=media&token=c676fa1f-45d0-4905-83ec-4668eabfa01d","odometer":"234","id":"08D03AF5-2CD0-454C-9447-FFCB524E840B","status":1,"make":"McLaren","model":"720S","owner":"CtpddNgHFqffOGD7vfHAmiUP2e23","year":"2018"},{"owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","model":"720s","vin":"Hdjdjjjskjdjd","id":"0A632FE1-7BAE-402F-A87E-DF36F9C644F5","trim":"Coupe","timestamp":1684687482,"thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F0A632FE1-7BAE-402F-A87E-DF36F9C644F5%2FCCA0E7CC-11AD-4479-8112-C5935349C084.jpg?alt=media&token=d83204d0-434d-4d91-bb64-98f045711ba2","odometer":"18,000","year":"2018","status":1,"title":"McLaren 720s","make":"McLaren","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F0A632FE1-7BAE-402F-A87E-DF36F9C644F5%2FA6204C44-0394-4CD1-8DDB-303C32F8521A.png?alt=media&token=161000a6-a92f-47e0-a3da-cbc9765f3d13"},{"year":"2017","owner":"btcJBIeRmJXbKvggXpFhsV2dL7j1","timestamp":1684877006,"model":"R8","vin":"","make":"Audi","trim":"Coupe","title":"Audi R8","id":"29185B4A-9954-43E5-8A7E-526096A32A65","odometer":"37,267","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F29185B4A-9954-43E5-8A7E-526096A32A65%2FC45A62DF-4786-4279-8D66-CEC23DEDEC18.jpg?alt=media&token=08915365-f146-4e76-834d-a0f275db88d2","status":1,"cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F29185B4A-9954-43E5-8A7E-526096A32A65%2F9F78A5C5-E330-4D74-9084-3C4E1163555D.png?alt=media&token=b0b123f9-434d-4b54-be3d-f7f3a742cb73"},{"id":"3FE47BA4-D553-498E-AED3-AB3D5CDF80F6","cutout":"https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/Vehicles%2FCutouts%2FEthan_SF90.png?alt=media&token=38e0cf22-3cd7-4ed0-8629-f7a94a96f9ff","make":"Ferrari","vin":"ZFF95NLAXP0283075","status":1,"title":"Ferrari SF90","odometer":"323","trim":"Stradale","owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","year":"2023","model":"SF90","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F3FE47BA4-D553-498E-AED3-AB3D5CDF80F6%2FE4EF1962-61A4-4FA8-9995-AF6F4CE776FD.jpg?alt=media&token=40fdccb3-693f-4b9e-ac8c-5c41e749b46d","timestamp":1682362322},{"odometer":"152","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F5A69F9DD-BFF2-4996-8D97-08FB80889EFB%2F9B0DDA65-98A4-4B11-BCE9-F6ECF67DF007.png?alt=media&token=3f29356e-eb83-450e-97a6-364748aa173c","make":"Lamborghini","model":"Urus","owner":"m5J5wFYmrZhYzFNXfjaBwXTxzJu1","title":"Lamborghini Urus","status":1,"year":"2022","timestamp":1683687264,"thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F5A69F9DD-BFF2-4996-8D97-08FB80889EFB%2FCA78ABE6-97CB-4F3D-80D2-10E253FF7EA2.jpg?alt=media&token=e198b340-6b5c-416d-ada0-05b50e1b63b0","trim":"SUV","id":"5A69F9DD-BFF2-4996-8D97-08FB80889EFB","vin":"ZPBUA1ZL3NLA21313"},{"model":"Cullinan","odometer":"7,684","vin":"SLATV4C00NU210901","id":"5AC5ECDA-FE47-4EAF-82AB-E4D543FAEDD1","title":"Rolls Royce Cullinan","status":1,"make":"Rolls Royce","owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F5AC5ECDA-FE47-4EAF-82AB-E4D543FAEDD1%2F23C91C79-03FA-4A42-915D-21F12C376523.jpg?alt=media&token=89727912-0967-412d-9050-4d92fbbcab76","timestamp":1684688280,"trim":"SUV","year":"2022","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F5AC5ECDA-FE47-4EAF-82AB-E4D543FAEDD1%2F6FDA3D0C-ACE6-4DA4-B637-8C6F1EE7BA6B.png?alt=media&token=395e0c2b-ccc5-46ce-bfe2-854998aa3ce4"},{"vin":"ZFF93LMA4N0270179","make":"Ferrari","title":"Ferrari F8","odometer":"3,443","status":1,"cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F5F436147-B667-4F50-88B0-BE3E33966CA5%2FB6583F2D-DA7B-4C4B-A80B-C040C11DF205.png?alt=media&token=de21c5c5-ce2c-49cd-ad86-9b1334c2d5ac","trim":"Spider","model":"F8","owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","timestamp":1683763962,"year":"2022","id":"5F436147-B667-4F50-88B0-BE3E33966CA5","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F5F436147-B667-4F50-88B0-BE3E33966CA5%2FD0D4D4EE-C20F-4F96-8010-25B819A0CFB9.jpg?alt=media&token=909d3cb9-f4c7-4bae-bd53-11187e847b45"},{"id":"6F7CD6E0-3573-47FD-AF26-BDF21F1257A1","model":"Urus S","trim":"","owner":"oImncPW7w7azql7eF15KGHSEUc62","timestamp":1684687106,"thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F6F7CD6E0-3573-47FD-AF26-BDF21F1257A1%2FE992918D-DDFE-4CDF-A493-386EC060CB44.jpg?alt=media&token=8c88ae96-0c86-4a3f-9a3b-03b77682d92d","vin":"ZPBUB3ZL7PLA24162","make":"Lamborghini","year":"2023","odometer":"137","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F6F7CD6E0-3573-47FD-AF26-BDF21F1257A1%2F453A0A3B-0DF2-41F9-92D7-972CF20030F3.png?alt=media&token=d1d11a7f-f5a5-443d-87a4-b6de9c008aa4","status":1,"title":"Lamborghini Urus S"},{"model":"Huracan Tecnica","odometer":"144","vin":"","id":"769E9579-B31C-4B90-A707-1B9D2A98A928","trim":"","year":"2023","owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F769E9579-B31C-4B90-A707-1B9D2A98A928%2F5358AA5D-2566-465C-BE56-00C08216BFEC.png?alt=media&token=7f3adfe4-e542-4682-bfe6-8375b73bcac2","status":1,"timestamp":1684687597,"make":"Lamborghini ","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F769E9579-B31C-4B90-A707-1B9D2A98A928%2F525AAF43-9BCF-4F9A-9F5F-6A7339C72C7A.jpg?alt=media&token=9f009883-4e72-4ca4-aecd-636cc676506f","title":"Lamborghini Huracan Tecnica"},{"make":"McLaren","owner":"CtpddNgHFqffOGD7vfHAmiUP2e23","odometer":"","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F88066E56-C580-4FA6-8CCD-D53F9AD0C88C%2F8455D85A-2898-430A-BC0B-8166FB6A8664.jpg?alt=media&token=445a1bae-6fc5-4590-8d26-c69237b7b8d5","title":"McLaren 765LT","id":"88066E56-C580-4FA6-8CCD-D53F9AD0C88C","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F88066E56-C580-4FA6-8CCD-D53F9AD0C88C%2FCAEEA2F0-E66C-4937-AAB2-9E42B50B645C.png?alt=media&token=7fa40ca2-f74d-46fc-a874-5fe4f5cd5739","model":"765LT","status":1,"vin":"798798798790980","timestamp":1683293047,"trim":"","year":"2022"},{"vin":"4JGFD6BB6NA726216","timestamp":1683315439,"id":"88155CCD-2BD5-4BE6-AF59-6EEFB24AD62A","title":"Mercedes Benz GLE53","status":1,"model":"GLE53","year":"2022","owner":"QJwaghHnbxfnNDBTdBQhqW9cMHH2","make":"Mercedes Benz ","trim":"Coupe","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F88155CCD-2BD5-4BE6-AF59-6EEFB24AD62A%2FFE4CEA71-69A0-4B76-9620-CD1720EEAA18.png?alt=media&token=6d25d343-aca8-4f96-9019-3ff68edf336e","odometer":"17,659","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F88155CCD-2BD5-4BE6-AF59-6EEFB24AD62A%2FB2E35A25-F5D4-43ED-AC09-4AC7DCEEDC09.jpg?alt=media&token=1fc3d56e-1e70-4d42-81f7-69363900a7d4"},{"id":"9890CC57-3581-477B-BBFD-1B979FDCE2F7","title":"Range Rover Sport","year":"2021","model":"Ranger Rover","timestamp":1682785177,"owner":"hNsGIfRMzAhkHZBAqBVd4nXzD5i1","make":"Land Rover","odometer":"18,743","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2F9890CC57-3581-477B-BBFD-1B979FDCE2F7%2F7B65CEC7-867A-4179-9943-AF5046AB2199.jpg?alt=media&token=af4b47b9-2b8a-4f72-a3b6-57d0e51cc998","trim":"Sport","status":1,"vin":"SALWG2SUOMA762805"},{"trim":"","owner":"WhQwjuZeRWSWOVjD6k044uUS1V23","make":"Lamborghini","id":"173D4723-CFD4-4097-ADF7-683E8E70E874","timestamp":1682302260,"odometer":"26","status":1,"model":"Urus S","vin":"","year":"2023","title":"Lamborghini Urus S"},{"vin":"09850938409523452","model":"Aventador","status":1,"title":"Lamborghini Aventador","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FA0C1C38B-A6CA-4871-BD5A-7ADF7B104DD4%2F2A0CD4D1-FB8A-4DD5-B3F9-92FD007E9365.png?alt=media&token=36090745-9623-417f-9ce1-955a17afe11a","owner":"CtpddNgHFqffOGD7vfHAmiUP2e23","id":"A0C1C38B-A6CA-4871-BD5A-7ADF7B104DD4","timestamp":1683292677,"year":"2017","trim":"SVJ","make":"Lamborghini","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FA0C1C38B-A6CA-4871-BD5A-7ADF7B104DD4%2F3F824CED-5405-448C-88A4-E7DC364B713E.jpg?alt=media&token=72ad4d31-b465-4596-9a5a-85fd619c29bf","odometer":""},{"id":"A28D78A8-F4B5-4934-BEA6-7DFA46213356","model":"720s","title":"McLaren 720s","odometer":"5370","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FA28D78A8-F4B5-4934-BEA6-7DFA46213356%2FAC20CECD-4A79-440E-9C1A-DB0EA2000195.jpg?alt=media&token=86cd75ac-270a-447b-a239-e12f6bc4ef7c","status":1,"make":"McLaren","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FA28D78A8-F4B5-4934-BEA6-7DFA46213356%2FB23B418D-C327-4885-B4FC-BDC93D81B312.png?alt=media&token=7b62ae78-9d5f-4ad3-8c57-a4ee6b88c997","owner":"f7MtubfUgqguzey3SbQxcL6EYtS2","vin":"SBM14DCA2JW002357","timestamp":1684688248,"trim":"Coupe","year":"2018"},{"status":1,"odometer":"35,237","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FABCD4AE1-AAE2-4724-A67F-6A3020CF0A69%2F2BEC5BD5-7830-421B-9B4D-8DE6BBAE0B71.png?alt=media&token=a295c091-b37a-4626-8154-0726dbd67580","make":"Audi","trim":"","model":"R8","title":"TT Audi R8","vin":"WUAKBAFX9H7901127","owner":"m5J5wFYmrZhYzFNXfjaBwXTxzJu1","year":"2017","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FABCD4AE1-AAE2-4724-A67F-6A3020CF0A69%2FBBA5E46C-A5BD-46E3-BBCD-78A994CFC039.jpg?alt=media&token=45a410c1-acca-4a8a-9376-49a74d09a4cf","timestamp":1683687274,"id":"ABCD4AE1-AAE2-4724-A67F-6A3020CF0A69"},{"thumbnail":"https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/vehicles%2FHellcat%2F397840.jpg?alt=media&token=c085cdf7-c46a-41e8-8147-495a42dbdc77","model":"Challenger Hellcat SRT","timestamp":1683513423,"id":"C4DB47A1-A73C-4C1B-B0B8-07F66B090B04","owner":"CtpddNgHFqffOGD7vfHAmiUP2e23","vin":"0298309680594","odometer":"54,201","make":"Dodge","cutout":"https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/vehicles%2FHellcat%2Fhellcar_test.png?alt=media&token=2138daf4-8cf2-4b37-8550-9df1bdbb08d5","trim":"Hellcat SRT","year":"2021","status":1,"title":"2021 Dodge Challenger Hellcat"},{"vin":"ZPBUA1ZL7NLA18690","id":"C5FAA6DD-0159-4106-B39A-E0AAF773F070","title":"Lamborghini Urus","owner":"rNA4RI3zIKPEpvZYY8tAnhUTu4u2","odometer":"152","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FC5FAA6DD-0159-4106-B39A-E0AAF773F070%2F668FD5D4-B939-4670-A6DB-F2FF8630D196.png?alt=media&token=9b3c7101-5629-4e4e-b4c1-34df1cdb02cb","timestamp":1683687225,"year":"2022","make":"Lamborghini","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FC5FAA6DD-0159-4106-B39A-E0AAF773F070%2F33C24D0B-B529-40D9-9E0C-CD5AD9100B94.jpg?alt=media&token=4933279b-6a5c-4032-84c0-1c33a8031433","status":1,"model":"Urus","trim":""},{"title":"Mclaren 720S","vin":"475685786989789","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FE2C36039-4C4D-4DEC-9614-156EFFE1929F%2F13B7D3C3-5312-4C6E-91C2-E1115D32C137.png?alt=media&token=91de2db4-8fe5-4055-9a36-f7242d2551fb","make":"McLaren","status":1,"trim":"Mansory","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FE2C36039-4C4D-4DEC-9614-156EFFE1929F%2FB07B21CA-3ECE-46D5-9DBE-ADE9D8C9AF42.jpg?alt=media&token=e897848d-30f9-476d-90a7-35449f2c2aca","timestamp":1684687028,"odometer":"1,876","year":"2022","model":"720S","id":"E2C36039-4C4D-4DEC-9614-156EFFE1929F","owner":"qVERmUeFSLbFhG7FjNKrxTx48UZ2"},{"odometer":"7838","model":"Range Rover","timestamp":1682736271,"year":"2022","make":"Land Rover","vin":"SALWR2SE4MA772966","owner":"wUtyip1uXDhJpiLoqAbo14G86Wy2","id":"9B9F500C-1556-421C-AC48-543C18A80F94","title":"Range Rover Sport","trim":"","status":1},{"thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FEAE3A431-EAB6-4EC9-BE4D-51D7320A78D6%2FD7F4AE1A-2040-4DA3-BF28-DF4BFCBA3D4B.jpg?alt=media&token=7a1330d4-abe0-437d-aba7-4b25f37e13f4","vin":"4JGFF8HB3NA804724","title":"Mercedes-Benz GLS 600","make":"Mercedes-Benz","id":"EAE3A431-EAB6-4EC9-BE4D-51D7320A78D6","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FEAE3A431-EAB6-4EC9-BE4D-51D7320A78D6%2F873BE4F6-DB28-4404-B929-DC73A507EC38.png?alt=media&token=1c836d6a-a0aa-48f1-988b-f632ddd4f451","odometer":"287","owner":"f7MtubfUgqguzey3SbQxcL6EYtS2","year":"2022","timestamp":1684688257,"trim":"SUV","model":"GLS 600","status":1},{"year":"2023","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FF18E6580-F1CF-4E87-9855-B914978DF026%2F00DDC696-D5FA-43DC-AB65-3566152B467B.png?alt=media&token=c4c94e45-516b-44b3-9fd3-edaedfc72163","vin":"ZHWUB6ZF8PLA22515","owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","trim":"Coupe","title":"Lamborghini Huracan Tecnica ","odometer":"13","status":1,"timestamp":1683686888,"id":"F18E6580-F1CF-4E87-9855-B914978DF026","model":"Huracan","make":"Lamborghini","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FF18E6580-F1CF-4E87-9855-B914978DF026%2F6297089E-2DEE-40B4-BA13-5B054602C411.jpg?alt=media&token=9f88a34e-8b7a-47eb-8406-99828e5f5b1d"},{"trim":"Pista","vin":"87488838747474","model":"488","timestamp":1683292629,"status":1,"title":"Ferrari 488 Pista","make":"Ferrari","odometer":"200","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FFB72C5D0-81B6-4F3C-8483-CA8BD2FA324E%2FC05D17E8-A39C-45FD-80DD-6884E87ADB70.png?alt=media&token=414b1e96-6681-4084-9fcb-10ef267958c4","year":"2019","owner":"CtpddNgHFqffOGD7vfHAmiUP2e23","thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FFB72C5D0-81B6-4F3C-8483-CA8BD2FA324E%2FC8F2B634-3889-47F5-B0E9-85C868C353E7.jpg?alt=media&token=6791b3cf-1912-4099-a6e3-7284646dbd64","id":"FB72C5D0-81B6-4F3C-8483-CA8BD2FA324E"},{"vin":"ZHWUC1ZF1FLA01200","trim":"","owner":"lC32e2WCJVYFy4HqYwKCC7yliMG3","status":1,"id":"PYacguOtCzbZ29WyjTz1","earnings":"1,520.50","cutout":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FPYacguOtCzbZ29WyjTz1%2FD6587809-E8F4-4F3E-8D43-3BC94C4B3C82.png?alt=media&token=937d3e06-cde6-4314-9de9-8a52890f33a9","year":"2015","timestamp":1683686915,"thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FPYacguOtCzbZ29WyjTz1%2F6E2148DC-81EA-475A-B361-45DBFE95A7A6.jpg?alt=media&token=f12c6907-8c47-4c4f-ab5f-d10376807d08","odometer":"20,352","title":"Lamborghini Huracan","gallery":["https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/Vehicles%2FThumbnail%2Fuser1%2FFrame%201000000921.jpg?alt=media&token=b0a0e829-e4f9-4e21-9150-20f4bf6df0ad"],"make":"Lamborghini","model":"Huracan"},{"owner":"CtpddNgHFqffOGD7vfHAmiUP2e23","timestamp":1683180162,"thumbnail":"https://firebasestorage.googleapis.com:443/v0/b/supercar-automation.appspot.com/o/vehicles%2FVWeDhzrMGagsluPRFTV9%2F3544CB17-2BFE-4EAE-9003-8F62C48D54CA.jpg?alt=media&token=9739c560-e976-4af4-9ca1-a61edde87413","id":"VWeDhzrMGagsluPRFTV9","status":1,"model":"Huracan","vin":"80958340958345","year":"2022","make":"Lamborghini","trim":"Edition","title":"Lamborghini Huracan","cutout":"https://firebasestorage.googleapis.com/v0/b/supercar-automation.appspot.com/o/Vehicles%2FCutouts%2Ftest_lambo2.png?alt=media&token=618c0395-16ce-4ee5-ad2e-a9625c607f87","odometer":"5,322"}]
`;

import { Box, Text, Flex, Image, Badge, chakra, Link } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function Vehicles() {
  //   useEffect(()=> {
  //     const fetchDocs = async () => {
  //         const res = await getDocs (vehiclesColRef)
  //         const docs = res.docs.map (doc => doc.data())

  //         console.log (JSON.stringify(docs))
  //      }

  //      fetchDocs()
  //   }, [])

  const [vehciles, setVehicles] = useState(JSON.parse(vehiclesCols));

  console.log(vehciles);

  return (
    <>
      <Flex height={"100%"} width={"100%"} p={"1rem"}>
        <Flex background={"var(--grey-color)"} width={"60%"}>
          <Box>
            <img src={vehciles[0].cutout} alt="vehicle pic" />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
