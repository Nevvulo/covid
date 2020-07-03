import axios from 'axios';

export default async function getTotalTimeline (): Promise<any> {
    try {
        const request = await axios.get('/coronavirus/timeline')
            .then(res => res.data);
        return request;
    } catch (err) {
        return false;
    }
}