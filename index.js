
const sendInfo = () => {
  const name = document.querySelectorAll(".input-info")[0].value;
  const indexNumber = document.querySelectorAll(".input-info")[1].value;
  const id = document.querySelectorAll(".input-info")[2].value;
  const phone = document.querySelectorAll(".input-info")[3].value;
  const info = {
    name, indexNumber, id, phone
  }
  
  console.log(info);
  return info;
} 

export default sendInfo;