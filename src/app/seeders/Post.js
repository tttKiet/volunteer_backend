"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          userId: "CB112",
          title:
            "Tuyển dụng Tình Nguyện Viên - Đóng Góp Vì Một Tương Lai Tốt Đẹp",
          description:
            "Cộng đồng ngày càng nhận thức được tầm quan trọng của việc tham gia các hoạt động tình nguyện, từ việc giúp đỡ những người cần sự giúp đỡ đến việc đóng góp cho sự phát triển của xã hội và môi trường sống.\
           Nhiều tổ chức, doanh nghiệp và cơ quan chính phủ đã chú trọng đến hoạt động tình nguyện và \
           tuyển dụng những người có tâm huyết và sẵn sàng đóng góp cho cộng đồng.\
\
          Với mong muốn tạo sân chơi lành mạnh, giao lưu học hỏi, cùng chung tay vì một môi trường sống tốt đẹp hơn,\
           các tổ chức cũng không ngừng tuyển dụng tình nguyện viên. Điều đáng chú ý là tình nguyện viên không chỉ đóng góp thời gian, sức lao động mà còn mang lại cho họ nhiều giá trị như học hỏi, rèn luyện kỹ năng, tạo cơ hội giao lưu kết bạn và cảm thấy hạnh phúc vì\
            đã làm điều tốt đẹp cho xã hội.\
          Nếu bạn đang tìm kiếm một công việc tình nguyện để đóng góp cho cộng đồng và muốn học hỏi kinh nghiệm mới, \
          đây là cơ hội tốt để bạn tham gia. Bằng cách trở thành tình nguyện viên, bạn sẽ có cơ hội tham gia các hoạt\
           động như tổ chức sự kiện, phát tờ rơi, giúp đỡ người khó khăn, hỗ trợ cho các chương trình xã hội,\
            giáo dục, y tế và nhiều hoạt động tuyệt vời khác. \
          Ngoài ra, bạn cũng sẽ có cơ hội học hỏi kỹ năng quản lý thời gian, truyền thông, giao tiếp,\
           làm việc nhóm, tự tin và nhiều kỹ năng khác. Đây là những kỹ năng rất quan trọng trong cuộc sống và\
            sẽ giúp bạn phát triển bản thân tốt hơn.",
          linkImage: "img1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "CB224",
          title: "ĐĂNG KÝ HỖ TRỢ VỆ SINH THƯ VIỆN TUẦN 8",
          description:
            "Kính chào quý Thầy, Cô, quý anh chị và các bạn,\
          Để hỗ trợ việc vệ sinh thư viện Trường CNTT&TT, Đội cần lực lượng tình nguyện viên đông đảo, tích cực đăng ký tham gia. Nội dung cụ thể:\
           - Về quyền lợi: Khi tham gia đủ số lượng buổi quy định (2 buổi) sẽ được ghi nhận thành tích như một lần 'vệ sinh khuôn viên Trường'.\
           - Công việc: Thực hiện các công việc theo sự điều động của cô Thủ thư (như quét dọn, lau dọn,...).\
           - Trang phục: Trang phục tự do, mang bảng tên, giày dép đúng quy định.\
           - Thời gian: thứ 2, 4, 6 tuần 8.\
             Thời gian ghi nhận:\
              + Sáng: 7h15-7h30 \
           - Link đăng ký: Tại đây \
          Lưu ý: - Mỗi buổi đăng ký tối đa 5 bạn, các bạn tập trung ở thư viện Trường CNTT&TT để điểm danh. Trường hợp bận việc đột xuất không thể thực hiện đúng như đã đăng ký, cần báo trước ít nhất 1 ngày.\
                      - Các trường hợp vắng không có lý do Đội sẽ lập danh sách và có biện pháp xử lý.\
                      - Đảm bảo giữ trật tự trong quá trình thực hiện công việc không gây ảnh hưởng đến các sinh viên đang học tập trong thư viện.",
          linkImage: "img2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
