import { Card, Space, Typography, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation'


interface DynamicFormProps {
    content: string;
    onClickfun : () => void;
}

export function TypoLink({content, onClickfun}: DynamicFormProps) {

    const router = useRouter()
    
    return (
        <Typography.Link onClick={onClickfun}>
            {content}
          </Typography.Link>
    )
}