export default function Tipsdata (data) {
    console.log("tips data", data);
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Tip</h3>
            <p className="text-gray-600">{data.data}</p>
        </div>
    );
}