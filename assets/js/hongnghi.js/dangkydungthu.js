
        

        // Mở/đóng popup
        function openPopup() {
            document.getElementById("trialForm").style.display = "flex";
            document.body.classList.add("overflow-hidden");
        }

        function closePopup() {
            document.getElementById("trialForm").style.display = "none";
            document.body.classList.remove("overflow-hidden");
        }

        // Bắt sự kiện submit
        document.getElementById("trialFormElement").addEventListener("submit", function (e) {
            e.preventDefault();

            //emailjs.init(publicKeyEmailJs);

            let form = e.target;
            let inputs = form.querySelectorAll("input, select, textarea");
            let isValid = true;

            inputs.forEach(input => {
                let feedback = input.nextElementSibling;
                if (!input.checkValidity()) {
                    input.classList.add("is-invalid");
                    if (feedback) feedback.style.display = "block";
                    isValid = false;
                } else {
                    input.classList.remove("is-invalid");
                    if (feedback) feedback.style.display = "none";

                    // Kiểm tra email hợp lệ
                    if (input.type === "email") {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            input.classList.add("is-invalid");
                            feedback.textContent = "Vui lòng nhập email hợp lệ.";
                            feedback.style.display = "block";
                            isValid = false;
                        }
                    }

                    // Kiểm tra số điện thoại
                    if (input.type === "tel") {
                        const phoneRegex = /^[0-9]{9,}$/;
                        if (!phoneRegex.test(input.value)) {
                            input.classList.add("is-invalid");
                            feedback.textContent = "Số điện thoại không hợp lệ.";
                            feedback.style.display = "block";
                            isValid = false;
                        }
                    }
                }
            });

            if (isValid) {
                const formData = {
                    contact: form.contact.value,
                    phone: form.phone.value,
                    email: form.email.value,
                    location: form.location.value,
                    address: form.address.value,
                    product: form.product.value,
                    note: form.note.value || "",
                    to_email: "dung.bui@mdfhongnghi.vn", // 📨 Người nhận
                    user_email: form.email.value // 🧾 Người đăng ký
                };

                emailjs.send("service_jmsajrv", "template_kmqda3d", formData)
                    .then(() => {
                        let toastEl = document.getElementById("trialToast");
                        let toast = new bootstrap.Toast(toastEl);
                        toast.show();

                        closePopup();
                        form.reset();
                    })
                    .catch(error => {
                        console.error("Lỗi gửi email:", error);
                        alert("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.");
                    });
            }
        });
