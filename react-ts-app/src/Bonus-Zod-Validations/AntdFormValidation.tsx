import { Button, Form, Input } from 'antd';
import { z, ZodError } from 'zod';

const formSchema = {
  email: z.string().min(1, 'Email không được để trống'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  retypePassword: z.string(),
};

// Giả lập API kiểm tra email
const checkEmailExists = async (email: string): Promise<boolean> => {
  // Thay thế bằng API thực tế của bạn
  const existingEmails = ['test@example.com', 'user@example.com'];
  return existingEmails.includes(email);
};

type LoginFormValues = z.infer<typeof formSchema>;

export default function AntdFormValidation() {
  const [form] = Form.useForm<LoginFormValues>();

  const onFinish = (values: LoginFormValues) => {
    // Xử lý dữ liệu hợp lệ ở đây
    console.log('Success:', values);
  };

  return (
    <div className="p-4">
      <strong>Antd Form Validation</strong>
      <hr />
      <Form
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
        layout="vertical"
        name="login-form"
        initialValues={{
          email: '',
          password: '',
          retypePassword: '',
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          validateDebounce={300}
          required
          rules={[
            {
              validator: async (_: unknown, value: string) => {
                try {
                  formSchema.email.parse(value);

                  const exists = await checkEmailExists(value); // Gọi API kiểm tra email
                  if (exists) {
                    return Promise.reject('Email đã tồn tại');
                  }
                  return Promise.resolve();
                } catch (error) {
                  if (error instanceof ZodError) {
                    return Promise.reject(error.issues[0]?.message || 'Validation error');
                  }
                  return Promise.reject('Validation failed');
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required
          rules={[
            {
              validator: (_: unknown, value: string) => {
                try {
                  formSchema.password.parse(value);
                  return Promise.resolve();
                } catch (error) {
                  if (error instanceof ZodError) {
                    return Promise.reject(error.issues[0]?.message || 'Validation error');
                  }
                  return Promise.reject('Validation failed');
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Retype Password"
          name="retypePassword"
          required
          rules={[
            {
              validator: (_: unknown, value: string) => {
                const password = form.getFieldValue('password');
                if (value !== password) {
                  return Promise.reject('Mật khẩu không khớp');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
