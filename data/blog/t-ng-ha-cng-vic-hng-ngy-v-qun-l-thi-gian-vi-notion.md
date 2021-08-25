---
title: Tự động hóa công việc hàng ngày và quản lý thời gian với Notion (Phần 1)
date: '2021-08-25'
tags: ['Phuong phap hoc tap']
draft: false
summary: Cách vô cùng đơn giản mà mình áp dụng cho việc học tập và làm việc hàng ngày
images: []
layout: PostLayout
---

Mình là người khá tham lam, nhiều khi mong muốn một ngày có nhiều hơn 24h 🙄 Và đương nhiên điều đó không 
thể trở thành sự thật được 🙁. Nên mình đã suy nghĩ về vấn đề này khá lâu và cuối cùng đã có câu trả lời.
\
Câu trả lời đó là: **Tự động hóa** \
Tự động hóa ở đây là tìm cách giảm bớt những công việc mà ngày nào bạn cũng làm lặp đi lặp lại và có thể để cho máy móc làm thay (hay còn gọi là sử dụng công cụ).
Mình tìm được phương pháp này là nhờ một câu nói mình đọc được trong cuốn "Đừng chạy theo số đông" của anh Kiên Trần. Mình xin trích nguyên văn câu nói đó ở đây.
> Hãy nhớ, con người chỉ nên làm công việc mà máy móc không thể làm. Chúng ta đang từng bước xóa bỏ tầng lớp nhân viên và tạo ra tầng lớp máy móc. (Chương số 32 - Đừng chạy theo số đông)

	![alt](https://i.redd.it/6fg3aicn6if41.png)
Vậy mình đã tự động hóa cách mình học và làm việc như thế nào?
Để thực hiện phương pháp này, chúng ta chỉ cần sử dụng duy nhất 2 thứ:
1. Startup Program
2. Notion 

Đầu tiên là về Startup Program \
Mình setup cho máy của mình mỗi lần khởi động nó sẽ tự động bật cho mình Chrome và VSCode (phần mềm mình dùng để lập trình) \
Đây là 2 phần mềm mà hầu như lúc nào mở máy lên mình cũng dùng đến, nên thay vì phải mở máy lên rồi bật từng cái (hoặc để ở chỗ nào đó dễ thấy ví dụ như taskbar) thì mình set cho nó tự bật luôn. Đây là cách giúp mình tiết kiệm được rất rất nhiều thời gian. Vậy cách thực hiện như nào. \
Đầu tiên các bạn ấn tổ hợp phím `Window + R` để mở hộp thoại Run (hoặc vào thanh tìm kiếm gõ Run là ra) \
Sau đó gõ lệnh `shell:common startup` để mở thư mục startup. 
![alt](https://st.quantrimang.com/photos/image/2021/08/13/tim-thu-muc-startup-windows-10-3.jpg) 

Thư mục Startup của mình sẽ như này

[![startup.jpg](https://i.postimg.cc/zvFdShLG/startup.jpg)](https://postimg.cc/2L3FCVFs)

Tiếp theo các bạn sẽ chọn ra vài phần mềm mà bạn muốn mở tự động khi mở máy. \
Sau khi chọn xong thì bạn ấn vào thanh tìm kiếm trên taskbar (hình kính lúp), tìm đến phần mềm đấy, giả sử ở đây mình chọn Excel \
Ở tab bên phải các bạn chọn vào `Open file location` như hình minh họa bên dưới
[![excel1.png](https://i.postimg.cc/8cC7CQVP/excel1.png)](https://postimg.cc/5YZ4Pr0Z)

Thư mục chứa Shortcut của Excel được mở ra
[![excel2.png](https://i.postimg.cc/9FW6rmSB/excel2.png)](https://postimg.cc/xq4xZ29k)
Giờ bạn chỉ việc copy shortcut đó rồi paste vào folder Startup bạn đã mở trước đó là xong
[![excel3.png](https://i.postimg.cc/pr9nZbcc/excel3.png)](https://postimg.cc/jnb5x9by)
Từ giờ mỗi khi bạn khởi động máy thì tất cả phần mềm trong folder Startup này sẽ tự động được bật, bạn có thể thêm bao nhiêu phần mềm vào đây cũng được nhưng đừng cho nhiều quá kẻo toang CPU đấy nhá 😢 \
Còn một cách để tự động hóa nữa cùng rất hay đấy là tự động hóa cho Chrome. \
Mình sẽ setup mỗi khi bật Chrome lên thì nó sẽ tự mở trang web mà mình yêu cầu, giả sử ở đây mình muốn nó mở Youtube với Notion, mình sẽ làm như sau: \
Đầu tiên bạn ấn vào dấu 3 chấm ở góc trên cùng bên phải này
![chrome1.png](https://i.postimg.cc/fknjSRWf/chrome1.png)
Sau đó chọn vào Cài đặt
![chrome2.png](https://i.postimg.cc/c4hBL0yw/chrome2.png)
Bạn chọn tiếp vào Khi khởi động
![chrome3.png](https://i.postimg.cc/tJMRBsnF/chrome3.png)
Chọn vào tùy chọn thứ 3 và thêm URL trang web mà bạn muốn bật mỗi khi bạn khởi động Chrome
![chrome4.png](https://i.postimg.cc/7Zsv7F7T/chrome4.png)
Sau đó tắt Chrome đi bật lại và tận hưởng thành quả nhé.  \
Bạn nào dùng Cốc cốc thì cũng làm tương tự với Chrome nhé. \
Cách này tuy đơn giản nhưng nó giúp mình tiết kiệm được rất nhiều thời gian cho công việc hàng ngày, hy vọng nó cũng sẽ giúp ích cho các bạn 😘. \
Bài này chắc cũng dài rồi, mình xin phép nói về Notion ở phần 2 nhé.