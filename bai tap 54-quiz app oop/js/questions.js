class Question {
    constructor(numb, question, answer, options) {
      this.numb = numb;
      this.question = question;
      this.answer = answer;
      this.options = options;
    }
  }
  
  const questions = [
    new Question(1, "Haiku là thể thơ truyền thống của nước nào?", "Nhật Bản", ["Nhật Bản", "Mông Cổ", "Trung Quốc", "Hàn Quốc"]),
    new Question(2, "Đâu là tên một loại bánh nổi tiếng ở Huế?", "Khoái", ["Thích", "Khoái", "Vui", "Sướng"]),
    new Question(3, "Gỗ mun có màu gì?", "Đen", ["Vàng", "Nâu", "Đen", "Xanh"]),
    new Question(4, "Đâu là tên một loại đồ chơi dân gian của trẻ em?", "Tò he", ["Tò he", "Tò mò", "Tò vò", "Tến tò"]),
    new Question(5, "Cướp biển còn được gọi với tên khác là gì?", "Hải tặc", ["Đạo tặc", "Lâm tặc", "Tin tặc", "Hải tặc"]),
  ];  