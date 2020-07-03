import axios from 'axios';

export default async function getTotalCases (): Promise<any> {
    try {
        const request = await axios.get('/coronavirus/total')
            .then(res => res.data);
        return request;
    } catch (err) {
        return false;
    }
}