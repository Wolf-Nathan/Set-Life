import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// App
export const stylesApp = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

// Home
export const stylesHome = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  helloText: {
    fontFamily: 'Montserrat',
    color: '#344644',
    fontSize: 30,
    textAlign: 'center',
  },
  dateText: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 24,
    textAlign: 'center',
  },
  dayProgramView: {
    height: (HEIGHT / 100) * 37,
  },
  newsView: {
    height: (HEIGHT / 100) * 37,
  },
  dayProgramText: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 22,
    marginLeft: 10,
  },
  dayOffContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeDayText: {
    fontFamily: 'Montserrat',
    color: '#1B5044',
    fontSize: 26,
  },
  freeDayLabel: {
    fontFamily: 'Montserrat',
    color: '#344644',
    fontSize: 24,
  },
});

// Login
export const stylesLogin = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    fontSize: 30,
    color: '#77897F',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  formContainer: {
    marginTop: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 19,
    paddingLeft: 45,
    marginHorizontal: 25,
    borderColor: '#1B5044',
    borderWidth: 2,
    fontFamily: 'Montserrat',
  },
  ctaTogglePassword: {
    position: 'absolute',
    top: 10,
    right: 37,
  },
  ctaLogin: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#1B5044',
    justifyContent: 'center',
    marginTop: 50,
  },
  textLogin: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
});

// Opening
export const stylesOpening = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F2F2F2',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    fontSize: 30,
    color: '#77897F',
    fontWeight: '500',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  ctaLogin: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#1B5044',
    justifyContent: 'center',
    margin: 10,
  },
  textLogin: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
});

// Register
export const stylesRegister = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    fontSize: 30,
    color: '#77897F',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  formContainer: {
    marginTop: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 19,
    paddingLeft: 45,
    marginHorizontal: 25,
    borderColor: '#1B5044',
    borderWidth: 2,
    fontFamily: 'Montserrat',
  },
  ctaTogglePassword: {
    position: 'absolute',
    top: 10,
    right: 37,
  },
  ctaLogin: {
    width: WIDTH - 55,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#1B5044',
    justifyContent: 'center',
    marginTop: 50,
  },
  textLogin: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
});

// Row Task
export const stylesRowTask = StyleSheet.create({
  row: {
    backgroundColor: '#1B5044',
    borderRadius: 15,
    padding: 5,
    paddingLeft: 15,
    width: WIDTH - 20,
    margin: 5,
    alignSelf: 'center',

  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#F2F2F2',
  },
  timeText: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#F2F2F2',
  },
  opt_btn: {
    zIndex: 1,
    padding: 5,
    margin: 5,
    position: 'absolute',
    right: -5,
    top: 3,
  },
});

// Settings
export const stylesSettings = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: WIDTH - 20,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  rowContainerSub: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Montserrat',
    color: '#344644',
    fontSize: 30,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 24,
    marginLeft: 10,
  },
  text: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1B5044',
    borderRadius: 15,
    width: 150,
    height: 50,
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#F2F2F2',
    alignSelf: 'center',
  },
  buttonDisconnect: {
    position: 'absolute',
    bottom: 10,
  },
  inputTime: {
    padding: 3,
    marginLeft: 3,
    marginRight: 3,
    width: 80,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#1B5044',
  },
});

// Task Form
export const stylesTaskForm = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
  },
  title: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 24,
    textAlign: 'center',
  },
  choiceContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: WIDTH - 55,
    borderRadius: 7,
    overflow: 'hidden',
  },
  box: {
    height: 50,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#77897F',
  },
  boxSelected: {
    height: 50,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#1B5044',
  },
  buttonLine: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1B5044',
    borderRadius: 15,
    width: 100,
    height: 50,
    margin: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#F2F2F2',
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 18,
    marginLeft: 25,
    marginTop: 5,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 7,
    fontSize: 19,
    marginHorizontal: 25,
    borderColor: '#1B5044',
    borderWidth: 2,
    fontFamily: 'Montserrat',
  },
});

// Tasks
export const stylesTasks = StyleSheet.create({
  button: {
    backgroundColor: '#1B5044',
    borderRadius: 15,
    padding: 15,
    width: 150,
    margin: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#F2F2F2',
    alignSelf: 'center',
  },
});

// Weekday Selector
export const stylesWeekdaySelector = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: WIDTH - 60,
    borderRadius: 7,
    overflow: 'hidden',
  },
  day: {
    height: 40,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#77897F',
    alignSelf: 'center',
  },
  daySelected: {
    height: 40,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#1B5044',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#F2F2F2',
    textAlign: 'center',
  },
});

// NewsDetails

export const stylesNewsDetails = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    marginTop: Constants.statusBarHeight + 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  goBack: {
    zIndex: 1,
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: 5,
  },
  title: {
    fontFamily: 'Montserrat',
    color: '#344644',
    fontSize: 24,
    margin: 5,
    textAlign: 'center',
  },
  content: {
    fontFamily: 'Montserrat',
    color: '#000',
    fontSize: 20,
  },
  date: {
    fontFamily: 'Montserrat',
    color: '#77897F',
    fontSize: 16,
  },
  seeMore: {
    backgroundColor: '#1B5044',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    margin: 20,
  },
  seeMoreText: {
    fontFamily: 'Montserrat',
    color: '#fff',
    fontSize: 16,
  },
  picture: {
    alignSelf: 'center',
    margin: 25,
  },
});
