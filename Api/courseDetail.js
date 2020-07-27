import axios from 'axios';

const DetailCourse = async (linkApi) => {
  return await axios.get(linkApi);
}

export default DetailCourse;