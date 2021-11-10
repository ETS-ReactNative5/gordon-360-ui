import http from './http';

type Member = {
  // TODO: Currently never set by the API, always null
  AccountPrivate: Privacy | null;
  ActivityCode: string;
  ActivityDescription: string;
  ActivityImage: string;
  ActivityImagePath: string;
  Description: string;
  EndDate: string;
  FirstName: string;
  GroupAdmin: boolean;
  IDNumber: number;
  LastName: string;
  MembershipID: number;
  Participation: Participation;
  ParticipationDescription: ParticipationDesc;
  Privacy: boolean | null;
  SessionCode: string;
  SessionDescription: string;
  StartDate: string;
};

enum Privacy {
  Public,
  Private,
}

export const enum Participation {
  Member = 'MEMBR',
  Leader = 'LEAD',
  Advisor = 'ADV',
  Guest = 'GUEST',
}

export type ParticipationDesc = keyof typeof Participation;

export type Membership = {
  ACT_CDE: string;
  SESS_CDE: string;
  ID_NUM: number;
  PART_CDE: string;
  COMMENT_TXT: string;
  GRP_ADMIN?: boolean;
};

function addMembership(data: Membership): Promise<Membership> {
  return http.post('memberships', data);
}

const checkAdmin = async (
  userID: string,
  sessionCode: string,
  activityCode: string,
): Promise<boolean> => {
  const admins = await getGroupAdminsForInvolvement(activityCode);
  return admins.some((a) => a.SessionCode === sessionCode && a.IDNumber === parseInt(userID));
};

const editMembership = (membershipID: string, data: Membership): Promise<Membership> => {
  return http.put(`memberships/${membershipID}`, data);
};

const get = async (activityCode: string, sessionCode: string): Promise<Member[]> => {
  const activityMembers = await getAll(activityCode);
  return activityMembers.filter((m) => m.SessionCode === sessionCode);
};

//Change the privacy value for a club membership
const toggleMembershipPrivacy = async (userMembership: Member): Promise<void> =>
  http.put(`memberships/${userMembership.MembershipID}/privacy/${!userMembership.Privacy}`);

const getAll = (activityCode: string): Promise<Member[]> =>
  http.get(`memberships/activity/${activityCode}`);

const getGroupAdminsForInvolvement = (activityCode: string): Promise<Member[]> =>
  http.get(`memberships/activity/${activityCode}/group-admin`);

const getEmailAccount = async (email: string): Promise<Object> => {
  return await http.get(`accounts/email/${email}/`);
};

const getFollowersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activity/${activityCode}/followers/${sessionCode}`);

const getMembersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activity/${activityCode}/members/${sessionCode}`);

const getMembershipsForUser = (userID: string): Promise<Member[]> =>
  http.get(`memberships/student/${userID}`);

const remove = (membershipID: string): Promise<Membership> => {
  return http.del(`memberships/${membershipID}`);
};

const search = async (
  userID: string,
  sessionCode: string,
  activityCode: string,
): Promise<
  [isMember: boolean, participation: ParticipationDesc | null, membershipID: number | null]
> => {
  const memberships: Member[] = await http.get(`memberships/student/${userID}`);
  const membership = memberships.find(
    (m) => m.ActivityCode === activityCode && m.SessionCode === sessionCode,
  );
  return membership
    ? [true, membership.ParticipationDescription, membership.MembershipID]
    : [false, null, null];
};

// TODO: Refactor API to not require unused Membership body
const toggleGroupAdmin = async (membershipID: number, data: Membership): Promise<Membership> => {
  return await http.put(`memberships/${membershipID}/group-admin`, data);
};

const membershipService = {
  addMembership,
  checkAdmin,
  editMembership,
  get,
  getAll,
  getAllGroupAdmins: getGroupAdminsForInvolvement,
  getEmailAccount,
  getFollowersNum,
  getMembersNum,
  getIndividualMembership: getMembershipsForUser,
  remove,
  search,
  toggleGroupAdmin,
  toggleMembershipPrivacy,
};

export default membershipService;
