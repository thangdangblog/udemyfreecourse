import axios from 'axios';

const AUTH_TOKEN = "Authorization: Basic MTAxQTVsUWN2MVF1ZnFYcU5zc3BzUDQ3ejJselgyOHRmODJSZUViQTpJeEdRVWhPaW5qazltNTdPdGN6MkJwcGZsMWxsZDdvS0xqVlNleVI4SElJWlJUSGZsaWZtY3ljemFSbWxER2NGeGVNNTJLc0VmUVU5Wm5naHBmRDBlQ1dvUmh5bFU4YjJwRGVzS01pMXpRdWlzY3EwOTFtV0lyN0w5SDhvb2xhQQ==";
const DetailCourseUdemy = async (params) => {
  const id = params.id;
  const coupon = params.coupon;
  const url = "https://www.udemy.com/api-2.0/courses/"+ id +"?couponcode="+ coupon +"&fields[course]=@all";
  return await axios.get(url,{
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      host: '104.236.174.88',
      port: 3128
    }
  });
}

export default DetailCourseUdemy;