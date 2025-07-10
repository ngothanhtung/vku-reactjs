import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Select, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router';

import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

import useCreateTask from '../hooks/useCreateTask';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

type CreateTaskFormData = {
  title: string;
  description?: string;
  start_date: Dayjs;
  due_date?: Dayjs;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee_id?: number;
  created_by?: number;
};

export default function CreateTaskPage() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { handleCreateTask, loading } = useCreateTask();

  const handleSubmit = async (values: CreateTaskFormData) => {
    const taskData = {
      title: values.title,
      description: values.description,
      start_date: values.start_date.toDate(),
      due_date: values.due_date?.toDate(),
      status: values.status,
      priority: values.priority,
      assignee_id: values.assignee_id,
      created_by: values.created_by,
      created_time: new Date(),
      updated_time: new Date(),
    };

    const success = await handleCreateTask(taskData);
    if (success) {
      form.resetFields();
      // Navigate back to tasks list (you can implement navigation here)
      console.log('Task created:', taskData);
      navigate('/tasks');
    }
  };

  const handleGoBack = () => {
    navigate('/tasks');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Create New Task
            </Title>
          </Col>
          <Col>
            <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack} type="default">
              Back to Tasks
            </Button>
          </Col>
        </Row>

        <Divider />

        {/* Form Card */}
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark="optional" size="large">
            <Row gutter={[16, 0]}>
              {/* Title */}
              <Col xs={24}>
                <Form.Item
                  name="title"
                  label="Task Title"
                  rules={[
                    { required: true, message: 'Please enter a task title' },
                    { min: 3, message: 'Title must be at least 3 characters' },
                    { max: 100, message: 'Title must not exceed 100 characters' },
                  ]}
                >
                  <Input placeholder="Enter a clear and descriptive task title" showCount maxLength={100} />
                </Form.Item>
              </Col>

              {/* Description */}
              <Col xs={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ max: 500, message: 'Description must not exceed 500 characters' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Provide detailed information about the task (optional)"
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
              </Col>

              {/* Status and Priority */}
              <Col xs={24} sm={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select a status' }]}
                  initialValue="to_do"
                >
                  <Select placeholder="Select task status">
                    <Option value="to_do">To Do</Option>
                    <Option value="in_progress">In Progress</Option>
                    <Option value="done">Done</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="priority"
                  label="Priority"
                  rules={[{ required: true, message: 'Please select a priority' }]}
                  initialValue="medium"
                >
                  <Select placeholder="Select task priority">
                    <Option value="low">
                      <span style={{ color: '#52c41a' }}>🟢 Low</span>
                    </Option>
                    <Option value="medium">
                      <span style={{ color: '#faad14' }}>🟡 Medium</span>
                    </Option>
                    <Option value="high">
                      <span style={{ color: '#ff4d4f' }}>🔴 High</span>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Dates */}
              <Col xs={24} sm={12}>
                <Form.Item
                  name="start_date"
                  label="Start Date"
                  rules={[{ required: true, message: 'Please select a start date' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select start date"
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="due_date"
                  label="Due Date"
                  dependencies={['start_date']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const startDate = getFieldValue('start_date');
                        if (!value || !startDate) {
                          return Promise.resolve();
                        }
                        if (value.isBefore(startDate)) {
                          return Promise.reject(new Error('Due date must be after start date'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select due date (optional)"
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                  />
                </Form.Item>
              </Col>

              {/* Assignee */}
              <Col xs={24} sm={12}>
                <Form.Item name="assignee_id" label="Assignee">
                  <Select placeholder="Select assignee (optional)" allowClear showSearch optionFilterProp="children">
                    <Option value={1}>User 1</Option>
                    <Option value={2}>User 2</Option>
                    <Option value={3}>User 3</Option>
                    <Option value={4}>User 4</Option>
                    <Option value={5}>User 5</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Created By (Hidden field, could be set from auth context) */}
              <Col xs={24} sm={12}>
                <Form.Item name="created_by" label="Created By" initialValue={1}>
                  <Select disabled>
                    <Option value={1}>Current User</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            {/* Form Actions */}
            <Row justify="end">
              <Col>
                <Space>
                  <Button type="default" size="large" onClick={() => form.resetFields()} disabled={loading}>
                    Reset
                  </Button>
                  <Button type="primary" size="large" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                    Create Task
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      </Space>
    </div>
  );
}
