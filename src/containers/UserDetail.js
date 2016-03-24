import React, { PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import Subheader from 'material-ui/lib/Subheader';
import Divider from 'material-ui/lib/divider';
import RepositoryAbstract from '../components/RepositoryAbstract';

function UserDetail(props) {
  const { user } = props;

  return (
    <div className="userDetail">
      <Avatar
        src={'../../design/avatar.gif'}
        size={160}
        className="avatar"
      />
      <div className="nickname">Frezc</div>
      <div className="email">504021398@qq.com</div>
      <div className="sign">风雨都放假时间反馈的数据方式创建付款了圣诞节开发商可的反馈了数据的科林费斯佛挡杀佛里的数据开放上课了对方几款是来得及覅看记得深刻理解付款了</div>
      <Divider style={{ width: '100%' }} />
      <Subheader>[Repositories] (<strong>2</strong>)</Subheader>
      <div className="repoList">
        <RepositoryAbstract
          style={{ marginTop: '8px' }}
        />
        <RepositoryAbstract
          style={{ marginTop: '8px' }}
        />
      </div>
      <Divider style={{ width: '100%' }}/>
      <Subheader>[Star Repositories] (<strong>1</strong>)</Subheader>
      <div className="repoList">
        <RepositoryAbstract
          style={{ marginTop: '8px' }}
        />
      </div>
    </div>
  );
}

UserDetail.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    nickname: PropTypes.string,
    sign: PropTypes.string,
    starlist: PropTypes.array,
    repositories: PropTypes.array
  }).isRequired
};

export default UserDetail;
