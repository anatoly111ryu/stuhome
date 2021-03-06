import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import Header from '../components/Header';
import NotifyList from '../components/NotifyList';
import PmSessionList from '../components/PmSessionList';
import MessageTabBar from '../components/3rd_party/MessageTabBar';
import ReplyModal from '../components/modal/ReplyModal';
import { invalidateNotifyList, fetchNotifyList } from '../actions/message/notifyListAction';
import { invalidatePmSessionList, fetchPmSessionList, markAsRead } from '../actions/message/pmSessionListAction';
import { submit } from '../actions/topic/publishAction';
import { resetReply } from '../actions/topic/replyAction';
import { getAtMeCount, getReplyCount, getPmCount, getAlertCount } from '../selectors/alert';

const TABS = [
  { label: '@', type: 'at' },
  { label: '回复', type: 'post' },
  { label: '私信', type: 'private' }
];

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReplyModalOpen: false,
      currentNotification: null
    };
  }

  _fetchNotifyList(notifyType) {
    this.props.fetchNotifyList({ notifyType });
  }

  _refreshNotifyList({ page, isEndReached, notifyType }) {
    this.props.invalidateNotifyList({ notifyType });
    this.props.fetchNotifyList({
      notifyType,
      isEndReached,
      page
    });
  }

  _fetchPmSessionList() {
    this.props.fetchPmSessionList({ page: 1 });
  }

  _refreshPmSessionList({ page, isEndReached }) {
    this.props.invalidatePmSessionList();
    this.props.fetchPmSessionList({
      isEndReached,
      page
    });
  }

  _publish({ boardId, topicId, replyId, images, content }) {
    this.props.submit({
      boardId,
      topicId,
      replyId,
      typeId: null,
      title: null,
      images,
      content
    });
  }

  toggleReplyModal(visible, notification) {
    this.setState({
      isReplyModalOpen: visible,
      currentNotification: notification
    });
  }

  // this is a hacky way to allow customized tab label
  // for each tab of <ScrollableTabView /> component.
  _getTabsWithAlertCount(tabs) {
    let newTabs = [];
    let { atMeCount, replyCount, pmCount } = this.props;
    newTabs.push({ name: tabs[0], count: atMeCount });
    newTabs.push({ name: tabs[1], count: replyCount });
    newTabs.push({ name: tabs[2], count: pmCount });
    return newTabs;
  }

  render() {
    let {
      notifyList,
      pmSessionList,
      reply,
      router,
      alertCount
    } = this.props;
    let { isReplyModalOpen, currentNotification } = this.state;

    return (
      <View style={mainStyles.container}>
        {isReplyModalOpen &&
          <ReplyModal
            visible={isReplyModalOpen}
            content={currentNotification}
            reply={reply}
            resetReply={() => this.props.resetReply()}
            closeReplyModal={() => this.toggleReplyModal(false)}
            handlePublish={comment => this._publish(comment)} />
        }
        <Header title='消息'
                alertCount={alertCount}
                updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <ScrollableTabView
          renderTabBar={(props) => <MessageTabBar newTabs={this._getTabsWithAlertCount(props.tabs)} />}
          tabBarBackgroundColor={colors.lightBlue}
          tabBarActiveTextColor={colors.white}
          tabBarInactiveTextColor={colors.white}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}>
          {TABS.map((tab, index) => {
            if (tab.type === 'private') {
              return (
                <PmSessionList
                  key={index}
                  tabLabel={tab.label}
                  pmSessionList={pmSessionList}
                  router={router}
                  markAsRead={({ plid }) => this.props.markAsRead({ plid })}
                  fetchPmSessionList={() => this._fetchPmSessionList(tab.type)}
                  refreshPmSessionList={({ page, isEndReached }) => this._refreshPmSessionList({ page, isEndReached })} />
              );
            }

            return (
              <NotifyList
                key={index}
                tabLabel={tab.label}
                notifyList={_.get(notifyList, tab.type, {})}
                router={router}
                fetchNotifyList={() => this._fetchNotifyList(tab.type)}
                refreshNotifyList={({ page, isEndReached }) => this._refreshNotifyList({ page, isEndReached, notifyType: tab.type })}
                openReplyModal={notification => this.toggleReplyModal(true, notification)} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ notifyList, reply, pmSessionList, alert }) {
  return {
    notifyList,
    reply,
    pmSessionList,
    atMeCount: getAtMeCount(alert),
    replyCount: getReplyCount(alert),
    pmCount: getPmCount(alert),
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateNotifyList,
  fetchNotifyList,
  submit,
  resetReply,
  fetchPmSessionList,
  invalidatePmSessionList,
  markAsRead
})(Message);
