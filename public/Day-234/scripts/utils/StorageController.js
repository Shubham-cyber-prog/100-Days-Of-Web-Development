export default class StorageController {
    static save(worldData) {
        localStorage.setItem('VOXEL_DATA', JSON.stringify(worldData));
        return true;
    }

    static load() {
        const data = localStorage.getItem('VOXEL_DATA');
        return data ? JSON.parse(data) : null;
    }
}
