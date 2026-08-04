package com.pos.pos.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class PosAPIException extends RuntimeException {
    private final HttpStatus status;
    private final String message;

    public PosAPIException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
