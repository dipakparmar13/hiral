export const config = () => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

// export const config1 = async () => {
//   const token = localStorage.getItem("token");
//   var headers = {
//     authorization: `Bearer ${token}`,
//   };
//   return headers;
// };
