import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // 가로축
    backgroundColor: '#fff',
  },
  image: {
    borderRadius: 500,
    width: 290,
    height: 290,
    marginTop: 20,
    marginBottom: 14,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  pinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: 'auto',
    backgroundColor: '#FFECEA',
    marginBottom: 27,
  },
  buttonText: {
    fontFamily: 'IropkeBatang',
    fontSize: 14,
    color: '#44403C',
  },
  wrapper: {
    width: 312,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  labelWrapper: {
    width: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  label: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
    color: '#44403C',
  },
  input: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 202,
    height: 40,
    fontFamily: 'IropkeBatang',
    fontSize: 14,
    color: '#44403C',
    borderBottomColor: '#D6D3D1',
    borderBottomWidth: 0.5,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#78716C',
    borderWidth: 0.5,
    width: 312,
    height: 60,
    borderRadius: 7,
    backgroundColor: '#FFECEA',
    marginTop: 30,
    marginBottom: 10,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#78716C',
    borderWidth: 0.5,
    width: 312,
    height: 60,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  lightLabelWrapper: {
    width: 310,
    alignItems: 'flex-start',
  },
  lightLabel: {
    fontSize: 14,
    color: '#78716C',
    fontFamily: 'IropkeBatang',
  },
  longInput: {
    width: 327,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: 'IropkeBatang',
    fontSize: 14,
    color: '#44403C',
    borderBottomColor: '#D6D3D1',
    borderBottomWidth: 0.5,
  },
});