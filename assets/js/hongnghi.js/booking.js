

        document.getElementById('bookingForm').addEventListener('submit', function (event) {
            event.preventDefault();

            // emailjs.init(publicKeyEmailJs);

            let form = event.target;
            let inputs = form.querySelectorAll('input, select');
            let isValid = true;

            inputs.forEach(input => {
                let feedback = input.nextElementSibling;
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    if (feedback) feedback.style.display = 'block';
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    if (feedback) feedback.style.display = 'none';

                    // Kiểm tra email hợp lệ
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            input.classList.add('is-invalid');
                            if (feedback) {
                                feedback.textContent = 'Vui lòng nhập email hợp lệ.';
                                feedback.style.display = 'block';
                            }
                            isValid = false;
                        }
                    }

                    // Kiểm tra số điện thoại hợp lệ (ít nhất 9 số)
                    if (input.type === 'tel') {
                        const phoneRegex = /^[0-9]{9,}$/;
                        if (!phoneRegex.test(input.value)) {
                            input.classList.add('is-invalid');
                            if (feedback) {
                                feedback.textContent = 'Số điện thoại không hợp lệ.';
                                feedback.style.display = 'block';
                            }
                            isValid = false;
                        }
                    }
                }
            });

            if (isValid) {
                const formData = {
                    company: form.company.value,
                    contact: form.contact.value,
                    industry: form.industry.value,
                    product: form.product.value,
                    email: form.email.value,
                    datetime: form.datetime.value,
                    location: form.location.value,
                    phone: form.phone.value,
                    to_email: 'dung.bui@mdfhongnghi.vn', // Email người nhận
                    user_email: form.email.value // Email người đặt lịch
                };

                emailjs.send("service_jmsajrv", "template_r3gwrdi", formData)
                    .then(() => {
                        let toastEl = document.getElementById('thankYouToast');
                        let toast = new bootstrap.Toast(toastEl);
                        toast.show();

                        const modalEl = document.getElementById('bookingModal');
                        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

                        // Đợi modal đóng xong rồi mới xử lý cleanup
                        modalEl.addEventListener('hidden.bs.modal', function onModalHidden() {
                            // Gỡ class modal-open (nếu còn)
                            document.body.classList.remove('modal-open');
                            document.body.style.removeProperty('padding-right');
                            document.body.style.removeProperty('overflow');

                            // Gỡ backdrop nếu bị sót
                            document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());

                            // Reset form
                            document.getElementById('bookingForm').reset();

                            // Gỡ sự kiện để tránh gọi nhiều lần
                            modalEl.removeEventListener('hidden.bs.modal', onModalHidden);
                        });

                        modal.hide();
                    })
                    .catch(error => {
                        console.error('Lỗi gửi email:', error);
                        alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại.');
                    });


            }
        });


