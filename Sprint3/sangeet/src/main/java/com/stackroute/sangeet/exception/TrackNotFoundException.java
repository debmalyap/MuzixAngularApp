package com.stackroute.sangeet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND, reason = "Track is not exist")
public class TrackNotFoundException extends Throwable {
}
