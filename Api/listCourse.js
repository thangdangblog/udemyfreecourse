import axios from 'axios';

const ListPost = async (params) => {
  const url = "https://thangdangblog.com/wp-json/wp/v2/udemy_course";
  return await axios.get(url,{
    params: params
  });
}

export default ListPost;