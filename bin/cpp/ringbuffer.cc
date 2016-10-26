#include <node.h>
#include "ringbuffer.h"

namespace demo {

using v8::Local;
using v8::Object;

void init(Local<Object> exports) {
  MyObject::Init(exports);

}

NODE_MODULE(ringbuffer, init)

}
