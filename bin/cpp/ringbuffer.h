#ifndef RINGBUFFER_H
#define RINGBUFFER_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class RingBuffer : public node::ObjectWrap {
public:
    static void Init(v8::Local<v8::Object> exports) {

    }

private:
    explicit RingBuffer(int size = 0);
    ~RingBuffer();

};

}

#endif
