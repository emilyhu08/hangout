import { Button, DatePicker, Form, Input } from 'antd';
import { addOne, storage } from 'firebase-config';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ImgUpload from '../styled/ImgUpload';
import { auth } from '/firebase-config';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const { RangePicker } = DatePicker;

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormInputs = ({ handleClose }) => {
  const [imageList, setImageList] = useState([]);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const onFinish = (values) => {
    imageList.forEach((file) => {
      handleUpload(file.originFileObj, values);
    });
  };

  const handleUpload = (file, values) => {
    if (!file) return;
    const storageRef = ref(storage, `/activities/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef);

    uploadBytes(storageRef, file).then((snapshot) => {
      let images = [];
      getDownloadURL(snapshot.ref)
        .then((url) => {
          images = [...images, url];
        })
        .then(() => {
          if (user.uid) {
            let activityObj = {
              userId: user.uid,
              userAvatarUrl: user.photoURL,
              userName: user.displayName,
              userEmail: user.email,
              activity: values.user.name,
              description: values.user.description,
              eventDate: moment(values.date).format('LLL'),
              imgUrls: images?.length && images,
              postDate: moment().format('LLL'),
              category: '',
              location: '',
            };
            addOne('activities', activityObj);
            handleClose();
            setImageList([]);
          } else {
            console.log('please log in first');
          }
        });
    });
  };

  const getImageList = (list) => {
    setImageList(list);
  };

  return (
    <Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item>
        <ImgUpload onChange={getImageList} />
      </Form.Item>
      <Form.Item
        name={['user', 'name']}
        label='Activity Name'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input allowClear placeholder='activity name' />
      </Form.Item>
      <Form.Item
        name='date'
        label='Event Date'
        rules={[
          {
            type: 'object',
            required: true,
            message: 'Please select date!',
          },
        ]}>
        <DatePicker showTime format='YYYY-MM-DD HH:mm' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={['user', 'description']}
        label='Description'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input.TextArea
          allowClear
          showCount={true}
          maxLength={250}
          placeholder='activtity description'
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 10,
        }}>
        <Button htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default FormInputs;