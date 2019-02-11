package com.stackroute.sangeet.repository;

import com.stackroute.sangeet.domain.Track;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SangeetRepository extends MongoRepository<Track, String> {
}
