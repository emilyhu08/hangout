import tw from 'tailwind-styled-components';

const Detail = ({ activity }) => {
  return (
    <Wrapper>
      <Image src={activity.activityImgUrl} alt='activity image'></Image>
      <Info>
        <div>{activity.activity}</div>
        <div>{activity.category}</div>
        <div>{activity.postDate}</div>
        <div>{activity.eventDate}</div>
        <div>{activity.firstName}</div>
        <div>{activity.lastName}</div>
        <Avatar src={activity.userAvatarUrl} alt='avatar'></Avatar>
        <address>{activity.location}</address>
        <div>{activity.description}</div>
      </Info>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = tw.div`grid grid-cols-2 gap-4 `;

const Image = tw.img`grid grid-cols-1`;

const Avatar = tw.img``;

const Info = tw.div`grid grid-cols-1`;
