import { Table, Tag, Space, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import useTasks from '../hooks/useTasks';
import type { Task } from '../types';

const { Text } = Typography;

export default function TasksPage() {
  const [tasks, loading] = useTasks();

  const columns: ColumnsType<Task> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '100%',
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
      filterSearch: true,
      onFilter: (value, record) => {
        const searchText = value as string;
        return (
          record.title.toLowerCase().includes(searchText.toLowerCase()) ||
          (record.description?.toLowerCase().includes(searchText.toLowerCase()) ?? false)
        );
      },
      render: (text: string, record: Task) => (
        <div>
          <Text strong>{text}</Text>
          {record.description && (
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.description.length > 50 ? `${record.description.substring(0, 50)}...` : record.description}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',

      filters: [
        { text: 'To Do', value: 'to_do' },
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Done', value: 'done' },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: Task['status']) => {
        const statusConfig = {
          to_do: { color: 'default', text: 'To Do' },
          in_progress: { color: 'processing', text: 'In Progress' },
          done: { color: 'success', text: 'Done' },
        };
        const config = statusConfig[status];
        return (
          <Tag style={{ fontWeight: 600, width: '100%', textAlign: 'center' }} color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      align: 'center',

      filters: [
        { text: 'Low', value: 'low' },
        { text: 'Medium', value: 'medium' },
        { text: 'High', value: 'high' },
      ],
      onFilter: (value, record) => record.priority === value,
      sorter: (a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      },
      render: (priority: Task['priority']) => {
        const priorityConfig = {
          low: { color: 'green', text: 'Low' },
          medium: { color: 'orange', text: 'Medium' },
          high: { color: 'red', text: 'High' },
        };
        const config = priorityConfig[priority];
        return (
          <Tag style={{ fontWeight: 600, width: '100%', textAlign: 'center' }} color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
      render: (date: Date) => <Text>{new Date(date).toLocaleDateString()}</Text>,
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => {
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      },
      render: (date: Date | undefined) => {
        if (!date) return <Text type="secondary">No Due Date</Text>;
        let color = 'green';
        const today = new Date();
        const dueDate = new Date(date);
        if (dueDate < today) {
          color = 'red';
        } else if (dueDate.getTime() - today.getTime() < 3 * 24 * 60 * 60 * 1000) {
          color = 'orange'; // Due in less than 3 days
        }
        return <Text style={{ fontWeight: 600, color }}>{dueDate.toLocaleDateString()}</Text>;
      },
    },

    {
      title: 'Completed Date',
      dataIndex: 'completed_date',
      key: 'completed_date',
      width: 160,
      ellipsis: true,
      sorter: (a, b) => {
        if (!a.completed_date && !b.completed_date) return 0;
        if (!a.completed_date) return 1;
        if (!b.completed_date) return -1;
        return new Date(a.completed_date).getTime() - new Date(b.completed_date).getTime();
      },
      render: (date: Date | undefined) => <Text>{date ? new Date(date).toLocaleDateString() : '-'}</Text>,
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee_id',
      key: 'assignee_id',
      width: 200,
      ellipsis: true,
      filters: [
        { text: 'Assigned', value: 'assigned' },
        { text: 'Unassigned', value: 'unassigned' },
      ],
      onFilter: (value, record) => {
        if (value === 'assigned') return !!record.assignee_id;
        if (value === 'unassigned') return !record.assignee_id;
        return true;
      },
      sorter: (a, b) => {
        if (!a.assignee_id && !b.assignee_id) return 0;
        if (!a.assignee_id) return 1;
        if (!b.assignee_id) return -1;
        return a.assignee_id - b.assignee_id;
      },
      render: (assigneeId: number | undefined) => <Text>{assigneeId ? `User ${assigneeId}` : 'Unassigned'}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      ellipsis: true,
      render: (_, record: Task) => (
        <Space size="small" style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="dashed" icon={<EyeOutlined />} size="middle" onClick={() => handleView(record.id)} />
          <Button type="dashed" icon={<EditOutlined />} size="middle" onClick={() => handleEdit(record.id)} />
        </Space>
      ),
    },
  ];

  const handleView = (taskId: string | number | undefined) => {
    console.log('View task:', taskId);
    // Navigate to view task page
  };

  const handleEdit = (taskId: string | number | undefined) => {
    console.log('Edit task:', taskId);
    // Navigate to edit task page
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tasks`,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        scroll={{ x: 800 }}
        showSorterTooltip={{ target: 'sorter-icon' }}
        sortDirections={['ascend', 'descend']}
        tableLayout="fixed"
      />
    </div>
  );
}
