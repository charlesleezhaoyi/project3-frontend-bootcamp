// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import { TextArea, TextInput, FileInput } from "../components/Input";
// import { BACKEND_URL } from "../constants.js";
// import axios from "axios";

// const NewBook = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [description, setDescription] = useState("");
//   const [releasedYear, setReleasedYear] = useState("");
//   const [condition, setCondition] = useState("");
//   const [review, setReview] = useState("");
//   const [photoArr, setPhotoArr] = useState([]);
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [postedPhotoId, setPostedPhotoId] = useState("");
//   const [primaryKeys, setPrimaryKeys] = useState([]);
//   const navigate = useNavigate();

//   const handleFileChange = async (e) => {
//     const photoUrl = e.target.files[0].name;
//     const imageFile = e.target.files[0];
//     const imageUrl = URL.createObjectURL(imageFile);

//     const obj = {
//       photoUrl: photoUrl,
//     };

//     const res = await axios.post(`${BACKEND_URL}/books/photos`, obj);
//     console.log(res.data);
//     const postedId = res.data.id;
//     setPostedPhotoId(postedId);
//     setPhotoUrl(imageUrl);
//   };

//   useEffect(() => {
//     if (postedPhotoId) {
//       setPrimaryKeys((primaryKeys) => [
//         ...primaryKeys,
//         { primaryKey: postedPhotoId },
//       ]);
//     }
//   }, [postedPhotoId]);

//   useEffect(() => {
//     if (photoUrl) {
//       setPhotoArr((photoArr) => [...photoArr, photoUrl]);
//     }
//   }, [photoUrl]);

//   const getPhotoPk = (arrIndex) => {
//     const selectedItem = primaryKeys[arrIndex];
//     const selectedPrimaryKey = selectedItem["primaryKey"];
//     return selectedPrimaryKey;
//   };

//   const handlePhotoClick = async (selectedId) => {
//     const id = getPhotoPk(selectedId);

//     await axios
//       .delete(`${BACKEND_URL}/books/photos`, {
//         data: { id: id },
//       })
//       .then(() => {
//         const newArr = [...photoArr];
//         const newPrimaryKeys = [...primaryKeys];
//         newArr.splice(selectedId, 1);
//         newPrimaryKeys.splice(selectedId, 1);

//         setPhotoArr(newArr);
//         setPrimaryKeys(newPrimaryKeys);
//       });
//   };

//   const photos = photoArr.map((image, index) => {
//     return (
//       <>
//         <div
//           className="border border-dashed overflow-hidden relative"
//           key={index}
//         >
//           <img
//             className="object-cover h-20 w-24"
//             src={image}
//             alt="book_cover"
//           />
//           <div className="absolute top-0 border ml-2 text-secondary-200 font-bold">
//             <button onClick={() => handlePhotoClick(index)}>X</button>
//           </div>
//         </div>
//       </>
//     );
//   });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const obj = {
//       title: title,
//       author: author,
//       description: description,
//       releasedYear: releasedYear,
//       condition: condition,
//       review: review,
//     };
//     const res = await axios.post(`${BACKEND_URL}/books`, obj);
//     console.log(res);

//     navigate("/onboarding");
//   };
//   return (
//     <>
//       <div className="grid grid-cols-4 m-10 space-y-3">
//         <div className="col-start-2">
//           <button onClick={() => navigate(-1)}>Back</button>
//         </div>
//         <div className="col-start-2 col-span-2 p-5 border">
//           <form onSubmit={handleFormSubmit} className=" space-y-12">
//             <div>
//               <TextInput
//                 label="Book title"
//                 type="text"
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <TextInput
//                 label="Author"
//                 type="text"
//                 onChange={(e) => setAuthor(e.target.value)}
//               />
//               <TextInput
//                 label="Genre"
//                 type="text"
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <TextInput
//                 label="Released Year"
//                 type="number"
//                 onChange={(e) => setReleasedYear(e.target.value)}
//               />
//               <TextInput
//                 label="Condition"
//                 type="text"
//                 onChange={(e) => setCondition(e.target.value)}
//               />
//               <TextArea
//                 label="Review"
//                 onChange={(e) => setReview(e.target.value)}
//               />
//             </div>

//             <div>
//               <div className="flex gap-4">{photos}</div>
//             </div>

//             <FileInput onChange={handleFileChange} />

//             <div>
//               <Button label="Submit" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewBook;
