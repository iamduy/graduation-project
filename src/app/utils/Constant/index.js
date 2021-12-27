const Constant = {

    RequestType: [
        { value: 1, label: "Báo hỏng" },
        { value: 2, label: "Thanh lý hợp đồng" },
        { value: 3, label: "Khác" },
    ],

    Notice: [
        { value: 0, label: 'Cảnh báo' },
        { value: 1, label: 'Nghiêm trọng' },
        { value: 2, label: 'Bình thường' }
    ],
  
    Status: [
        {
            value: 1,
            label: "Khởi tạo"
        },
        {
            value: 2,
            label: "Đã tiếp nhận"
        },
        {
            value: 3,
            label: "Đang xử lý"
        },
        {
            value: 4,
            label: "Hoàn thành"
        },
        {
            value: 5,
            label: "Từ chối"
        }
    ]





}



export default Constant