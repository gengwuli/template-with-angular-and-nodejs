//This is a very simple backend without connecting to the database
//authentification, fileupload etc. refer to them when necessary.

//express is the E in MEAN stack
var express = require('express')
//parse the payload as object
var bodyParser = require('body-parser')
//logger for loggin purpose, use it when necessary
var logger = require('morgan')
//only use it when necessary
var cookieParser = require('cookie-parser')

//use must be in order 
var app = express();
app.use(bodyParser.json())
app.use(corsEnable)
app.use(logger('default'))
app.use(cookieParser())

//stubs for frontend, one for ng-resource, one for xmlhttprequest
app.get('/stub', getStub)
app.post('/stub', addStub)

app.get('/xmlkmp', getKmp)
app.get('/xmlbin', getBin)

//enable cross orgin visit
function corsEnable(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': req.get('origin'),
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Requested-With'
    })
    if (req.method == 'OPTIONS') {
        //remember to add a return or it will affect the latter request
        return res.sendStatus(200);
    }
    next();
}

function getStub(req, res) {
    var stub = 'public static int strStr(String haystack, String needle) {\n  if (needle.isEmpty()) return 0;\n'
    +'  if (haystack.isEmpty()) return -1;\n  // Get next table \n  int[] nextTable = new int[needle.length()];\n'
    +'  nextTable[0] = -1;\n  // nextTable[1] = 0; default value is 0;\n  int cnd = 0;\n  int pos = 2;\n  '
    +'while (pos < needle.length()) {\n    //if we have a match, cnd++, pos++, next[pos]=cnd+1;\n    '
    +'if (needle.charAt(cnd) == needle.charAt(pos - 1)) {\n      cnd++;\n      nextTable[pos] = cnd;\n      '
    +'pos++;\n    } else if (cnd > 0) {\n      //if not match and cnd>0 traceback\n      cnd = nextTable[cnd];\n    '
    +'} else {\n      //if not match and cnd=0, next[pos]=0;\n      nextTable[pos] = cnd;\n      pos++;\n    '
    +'}\n  }\n  // -------------------------\n  cnd = 0;\n  pos = 0;\n  //run matching function\n  '
    +'while (pos != haystack.length() && cnd != needle.length()) {\n    //if match, move two cursors forward\n    '
    +'if (needle.charAt(cnd) == haystack.charAt(pos)) {\n      cnd++;\n      pos++;\n      //if not match at first '
    +'character, pos+1(compare next position in haystack)\n    } else if (cnd == 0) {\n      pos++;\n    } else '
    +'{\n      //if not match and cnd!=0, fetch cnd from next table and compare again\n      cnd = nextTable[cnd];\n    '
    +'}\n  }\n  //if cnd=needle.length meaning we found the needle in the haystack\n  if (cnd==needle.length()) '
    +'return pos-needle.length();\n  //if not found, return -1\n  return -1;\n}';

    var stub1 = 'public int findIndex(int[] nums, int target) {\n  int low = 0;\n  int high = nums.length - 1;\n  '
    +'while (low + 1 < high) { //break when low == high and low + 1 == high\n    int mid = low + (high - low) / 2; '
    +'//avoid overflow\n    if (nums[mid] == target) { //first equals target\n      return mid;\n    } else if '
    +'(nums[mid] > target) { //then greater than target\n      high = mid;//instead of mid-1\n    } else {\n      '
    +'low = mid;\n    }\n  }\n  if (nums[low] == target) { //see whether low equals target\n    return low;\n  }\n  '
    +'if (nums[high] == target) {\n    return high;\n  }\n  return -1;\n}';
    res.send({kmp: stub, binary: stub1}); // as XmlHttpRequest can receive string directly
}

function getKmp(req, res) {
    var stub = 'public static int strStr(String haystack, String needle) {\n  if (needle.isEmpty()) return 0;\n'
    +'  if (haystack.isEmpty()) return -1;\n  // Get next table \n  int[] nextTable = new int[needle.length()];\n'
    +'  nextTable[0] = -1;\n  // nextTable[1] = 0; default value is 0;\n  int cnd = 0;\n  int pos = 2;\n  '
    +'while (pos < needle.length()) {\n    //if we have a match, cnd++, pos++, next[pos]=cnd+1;\n    '
    +'if (needle.charAt(cnd) == needle.charAt(pos - 1)) {\n      cnd++;\n      nextTable[pos] = cnd;\n      '
    +'pos++;\n    } else if (cnd > 0) {\n      //if not match and cnd>0 traceback\n      cnd = nextTable[cnd];\n    '
    +'} else {\n      //if not match and cnd=0, next[pos]=0;\n      nextTable[pos] = cnd;\n      pos++;\n    '
    +'}\n  }\n  // -------------------------\n  cnd = 0;\n  pos = 0;\n  //run matching function\n  '
    +'while (pos != haystack.length() && cnd != needle.length()) {\n    //if match, move two cursors forward\n    '
    +'if (needle.charAt(cnd) == haystack.charAt(pos)) {\n      cnd++;\n      pos++;\n      //if not match at first '
    +'character, pos+1(compare next position in haystack)\n    } else if (cnd == 0) {\n      pos++;\n    } else '
    +'{\n      //if not match and cnd!=0, fetch cnd from next table and compare again\n      cnd = nextTable[cnd];\n    '
    +'}\n  }\n  //if cnd=needle.length meaning we found the needle in the haystack\n  if (cnd==needle.length()) '
    +'return pos-needle.length();\n  //if not found, return -1\n  return -1;\n}';
    res.send({data: stub}); //better return a object as ng-resource will enventually render as object
}

function getBin(req, res) {
    var stub1 = 'public int findIndex(int[] nums, int target) {\n  int low = 0;\n  int high = nums.length - 1;\n  '
    +'while (low + 1 < high) { //break when low == high and low + 1 == high\n    int mid = low + (high - low) / 2; '
    +'//avoid overflow\n    if (nums[mid] == target) { //first equals target\n      return mid;\n    } else if '
    +'(nums[mid] > target) { //then greater than target\n      high = mid;//instead of mid-1\n    } else {\n      '
    +'low = mid;\n    }\n  }\n  if (nums[low] == target) { //see whether low equals target\n    return low;\n  }\n  '
    +'if (nums[high] == target) {\n    return high;\n  }\n  return -1;\n}';
    res.send(stub1);
}

function addStub(req, res) {
    var stub = req.body.stub // so you need to put {stub: 'stub'} in the payload
    res.send({data: 'success'})
}

var port = process.env.PORT || 3111
var server = app.listen(port, function() {
    console.log('Server listening at http://%s:%s',
        server.address().address,
        server.address().port)
})
